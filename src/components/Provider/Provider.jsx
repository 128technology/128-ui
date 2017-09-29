import React from 'react';
import PropTypes from 'prop-types';
import { LocaleProvider } from 'antd';

import * as locales from './locales';

/**
 * 128 provider component. This component encapsulates sub-module providers
 * such as the ant design locale provider.
 *
 * Please see the [Ant Design LocaleProvider documentation](https://ant.design/components/locale-provider/)
 */
function Provider({ locale, children }) {
  let providerLocale = locales.enUS;

  if (locales[locale]) {
    providerLocale = locales[locale];
  }

  return <LocaleProvider locale={providerLocale.antd}>{children}</LocaleProvider>;
}

Provider.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.node
};

export default Provider;
