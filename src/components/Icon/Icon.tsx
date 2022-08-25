import React from 'react';

import Search from './icons/search.svg';
import Chevron from './icons/arrow_back_ios.svg';
import ArrowBack from './icons/arrow_back.svg';

const iconMap = {
  Search,
  Chevron,
  ArrowBack,
};

export type IconNameTypes = keyof typeof iconMap;

type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};

export const IconSizes = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xlg: 32,
  xxlg: 48,
  xxxlg: 56,
};

export type IconProps = {
  size: IconSizeProps['iconSizes'];
  name: IconNameTypes;
};

/**
 *
 * @param {IconProps.size} size
 * @param {IconProps.name} name
 * @returns {React.Component}
 */

export const Icon = ({ size, name }: IconProps) => {
  const IconSVG = iconMap[name];

  return <IconSVG width={IconSizes[size]} height={IconSizes[size]} />;
};
