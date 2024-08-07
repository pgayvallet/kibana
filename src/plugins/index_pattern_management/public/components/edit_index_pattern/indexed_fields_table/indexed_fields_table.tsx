/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { IndexPatternField, IndexPattern } from '../../../../../../plugins/data/public';
import { useKibana } from '../../../../../../plugins/kibana_react/public';
import { Table } from './components/table';
import { IndexedFieldItem } from './types';
import { IndexPatternManagmentContext } from '../../../types';

interface IndexedFieldsTableProps {
  fields: IndexPatternField[];
  indexPattern: IndexPattern;
  fieldFilter?: string;
  indexedFieldTypeFilter?: string;
  helpers: {
    editField: (fieldName: string) => void;
    deleteField: (fieldName: string) => void;
    getFieldInfo: (indexPattern: IndexPattern, field: IndexPatternField) => string[];
  };
  fieldWildcardMatcher: (filters: any[]) => (val: any) => boolean;
  userEditPermission: boolean;
}

interface IndexedFieldsTableState {
  fields: IndexedFieldItem[];
}

const withHooks = (Comp: typeof Component) => {
  return (props: any) => {
    const { application } = useKibana<IndexPatternManagmentContext>().services;
    const userEditPermission = !!application?.capabilities?.indexPatterns?.save;

    return <Comp userEditPermission={userEditPermission} {...props} />;
  };
};

class IndexedFields extends Component<IndexedFieldsTableProps, IndexedFieldsTableState> {
  constructor(props: IndexedFieldsTableProps) {
    super(props);

    this.state = {
      fields: this.mapFields(this.props.fields),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: IndexedFieldsTableProps) {
    if (nextProps.fields !== this.props.fields) {
      this.setState({
        fields: this.mapFields(nextProps.fields),
      });
    }
  }

  mapFields(fields: IndexPatternField[]): IndexedFieldItem[] {
    const { indexPattern, fieldWildcardMatcher, helpers, userEditPermission } = this.props;
    const sourceFilters =
      indexPattern.sourceFilters &&
      indexPattern.sourceFilters.map((f: Record<string, any>) => f.value);
    const fieldWildcardMatch = fieldWildcardMatcher(sourceFilters || []);

    return (
      (fields &&
        fields.map((field) => {
          return {
            ...field.spec,
            type: field.esTypes?.join(', ') || '',
            kbnType: field.type,
            displayName: field.displayName,
            format: indexPattern.getFormatterForFieldNoDefault(field.name)?.type?.title || '',
            excluded: fieldWildcardMatch ? fieldWildcardMatch(field.name) : false,
            info: helpers.getFieldInfo && helpers.getFieldInfo(indexPattern, field),
            isMapped: !!field.isMapped,
            isUserEditable: userEditPermission,
            hasRuntime: !!field.runtimeField,
          };
        })) ||
      []
    );
  }

  getFilteredFields = createSelector(
    (state: IndexedFieldsTableState) => state.fields,
    (state: IndexedFieldsTableState, props: IndexedFieldsTableProps) => props.fieldFilter,
    (state: IndexedFieldsTableState, props: IndexedFieldsTableProps) =>
      props.indexedFieldTypeFilter,
    (fields, fieldFilter, indexedFieldTypeFilter) => {
      if (fieldFilter) {
        const normalizedFieldFilter = fieldFilter.toLowerCase();
        fields = fields.filter(
          (field) =>
            field.name.toLowerCase().includes(normalizedFieldFilter) ||
            (field.displayName && field.displayName.toLowerCase().includes(normalizedFieldFilter))
        );
      }

      if (indexedFieldTypeFilter) {
        fields = fields.filter((field) => field.type === indexedFieldTypeFilter);
      }

      return fields;
    }
  );

  render() {
    const { indexPattern } = this.props;
    const fields = this.getFilteredFields(this.state, this.props);

    return (
      <div>
        <Table
          indexPattern={indexPattern}
          items={fields}
          editField={(field) => this.props.helpers.editField(field.name)}
          deleteField={(fieldName) => this.props.helpers.deleteField(fieldName)}
        />
      </div>
    );
  }
}

export const IndexedFieldsTable = withHooks(IndexedFields);
