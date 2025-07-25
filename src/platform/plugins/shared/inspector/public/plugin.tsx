/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { i18n } from '@kbn/i18n';
import * as React from 'react';
import { PluginInitializerContext, CoreSetup, CoreStart, Plugin } from '@kbn/core/public';
import { openLazyFlyout } from '@kbn/presentation-util';
import { SharePluginStart } from '@kbn/share-plugin/public';
import { InspectorViewRegistry } from './view_registry';
import { InspectorOptions, InspectorSession } from './types';
import { Adapters } from '../common';
import { getRequestsViewDescription } from './views';

export interface InspectorPluginStartDeps {
  share: SharePluginStart;
}

export interface Setup {
  registerView: InspectorViewRegistry['register'];
}

export interface Start {
  /**
   * Checks if a inspector panel could be shown based on the passed adapters.
   *
   * @param {object} adapters - An object of adapters. This should be the same
   *    you would pass into `open`.
   * @returns {boolean} True, if a call to `open` with the same adapters
   *    would have shown the inspector panel, false otherwise.
   */
  isAvailable: (adapters?: Adapters) => boolean;

  /**
   * Opens the inspector panel for the given adapters and close any previously opened
   * inspector panel. The previously panel will be closed also if no new panel will be
   * opened (e.g. because of the passed adapters no view is available). You can use
   * {@link InspectorSession#close} on the return value to close that opened panel again.
   *
   * @param {object} adapters - An object of adapters for which you want to show
   *    the inspector panel.
   * @param {InspectorOptions} options - Options that configure the inspector. See InspectorOptions type.
   * @param {unknown} parentApi - Optional parent api for trackingOverlays.
   * @return {InspectorSession} The session instance for the opened inspector.
   * @throws {Error}
   */
  open: (adapters: Adapters, options?: InspectorOptions, parentApi?: unknown) => InspectorSession;
}

const closeButtonLabel = i18n.translate('inspector.closeButton', {
  defaultMessage: 'Close Inspector',
});

export class InspectorPublicPlugin implements Plugin<Setup, Start> {
  views: InspectorViewRegistry | undefined;

  constructor(_initializerContext: PluginInitializerContext) {}

  public setup(_core: CoreSetup) {
    this.views = new InspectorViewRegistry();

    this.views.register(getRequestsViewDescription());

    return {
      registerView: this.views!.register.bind(this.views),
    };
  }

  public start(core: CoreStart, startDeps: InspectorPluginStartDeps) {
    const isAvailable: Start['isAvailable'] = (adapters) =>
      this.views!.getVisible(adapters).length > 0;

    const open: Start['open'] = (adapters, options = {}, parentApi) => {
      const views = this.views!.getVisible(adapters);

      // Don't open inspector if there are no views available for the passed adapters
      if (!views || views.length === 0) {
        throw new Error(`Tried to open an inspector without views being available.
          Make sure to call Inspector.isAvailable() with the same adapters before to check
          if an inspector can be shown.`);
      }

      const flyoutRef = openLazyFlyout({
        core,
        parentApi,
        loadContent: async () => {
          const { InspectorPanel } = await import('./async_services');
          return (
            <InspectorPanel
              views={views}
              adapters={adapters}
              title={options.title}
              options={options.options}
              dependencies={{
                application: core.application,
                http: core.http,
                uiSettings: core.uiSettings,
                share: startDeps.share,
                settings: core.settings,
                theme: core.theme,
              }}
            />
          );
        },
        flyoutProps: {
          'data-test-subj': 'inspectorPanel',
          'aria-labelledby': 'inspector-panel-title',
          closeButtonProps: { 'aria-label': closeButtonLabel },
          size: 'm',
          paddingSize: 'l',
          type: 'overlay',
          ...options.flyoutProps,
        },
      });
      return flyoutRef;
    };

    return {
      isAvailable,
      open,
    };
  }

  public stop() {}
}
