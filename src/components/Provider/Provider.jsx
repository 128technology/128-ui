import React from 'react';
import { LocaleProvider } from 'antd';
import * as locales from './locales';

/**
 * 128 provider component. This component encapsulates sub-module providers 
 * such as the ant design locale provider.
 *
 * Please see the [Ant Design LocaleProvider documentation](https://ant.design/components/locale-provider/)
 */
const Provider = ({ locale, children }) => {
  let providerLocale = locales.enUS;

  if (locales[locale]) {
    providerLocale = locales[locale];
  }

  return (
    <LocaleProvider locale={providerLocale.antd}>{children}</LocaleProvider>
  );
};

Provider.PropTypes = {
  locale: React.PropTypes.string,
  children:  React.PropTypes.node
};

export default Provider;
