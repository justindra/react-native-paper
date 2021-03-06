import color from 'color';
import * as React from 'react';
import { I18nManager, StyleProp, TextStyle } from 'react-native';

import Text from './Text';
import { withTheme } from '../../core/theming';
import type { SetPropAsOptional } from '../../types';

type Props = React.ComponentProps<typeof Text> & {
  alpha: number;
  family: 'regular' | 'medium' | 'light' | 'thin';
  style?: StyleProp<TextStyle>;
  theme: ReactNativePaper.Theme;
};

class StyledText extends React.Component<Props> {
  render() {
    const { theme, alpha, family, style, ...rest } = this.props;
    const textColor = color(theme.colors.text).alpha(alpha).rgb().string();
    const font = theme.fonts[family];
    const writingDirection = I18nManager.isRTL ? 'rtl' : 'ltr';

    return (
      <Text
        {...rest}
        style={[
          { color: textColor, ...font, textAlign: 'left', writingDirection },
          style,
          this.props.style,
        ]}
      />
    );
  }
}

// Set the theme to be optional as it should be provided through withTheme
export type StyledTextProps = SetPropAsOptional<Props, 'theme'>;

export default withTheme(StyledText);
