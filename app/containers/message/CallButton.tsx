import React from 'react';
import { View, Text } from 'react-native';

import Touchable from './Touchable';
import { BUTTON_HIT_SLOP } from './utils';
import styles from './styles';
import I18n from '../../i18n';
import { CustomIcon } from '../../lib/Icons';
import { themes } from '../../constants/colors';
import {TMessageCallButton} from "./types";

const CallButton = React.memo(({ theme, callJitsi }: TMessageCallButton) => (
	<View style={styles.buttonContainer}>
		<Touchable
			onPress={callJitsi}
			background={Touchable.Ripple(themes[theme].bannerBackground)}
			style={[styles.button, { backgroundColor: themes[theme].tintColor }]}
			hitSlop={BUTTON_HIT_SLOP}
		>
			<>
				<CustomIcon name='camera' size={16} style={styles.buttonIcon} color={themes[theme].buttonText} />
				<Text style={[styles.buttonText, { color: themes[theme].buttonText }]}>{I18n.t('Click_to_join')}</Text>
			</>
		</Touchable>
	</View>
));

CallButton.displayName = 'CallButton';

export default CallButton;
