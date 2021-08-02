import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';

import { CustomIcon } from '../../lib/Icons';
import styles from './styles';
import { themes } from '../../constants/colors';
import I18n from '../../i18n';
import Markdown from '../markdown';
import {TMessageRepliedThread} from "./types";


const RepliedThread = memo(({
	tmid, tmsg, isHeader, fetchThreadName, id, isEncrypted, theme
}: TMessageRepliedThread) => {
	if (!tmid || !isHeader) {
		return null;
	}

	const [msg, setMsg] = useState(isEncrypted ? I18n.t('Encrypted_message') : tmsg);
	const fetch = async() => {
		const threadName = await fetchThreadName(tmid, id);
		setMsg(threadName);
	};

	useEffect(() => {
		if (!msg) {
			fetch();
		}
	}, []);

	if (!msg) {
		return null;
	}

	return (
		<View style={styles.repliedThread} testID={`message-thread-replied-on-${ msg }`}>
			<CustomIcon name='threads' size={20} style={styles.repliedThreadIcon} color={themes[theme].tintColor} />
			{/*@ts-ignore*/}
			<Markdown
				msg={msg}
				theme={theme}
				style={[styles.repliedThreadName, { color: themes[theme].tintColor }]}
				preview
				numberOfLines={1}
			/>
			<View style={styles.repliedThreadDisclosure}>
				<CustomIcon
					name='chevron-right'
					color={themes[theme].auxiliaryText}
					size={20}
				/>
			</View>
		</View>
	);
});

RepliedThread.displayName = 'MessageRepliedThread';

export default RepliedThread;
