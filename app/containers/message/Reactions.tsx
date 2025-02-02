import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import Touchable from './Touchable';
import { CustomIcon } from '../../lib/Icons';
import styles from './styles';
import Emoji from './Emoji';
import { BUTTON_HIT_SLOP } from './utils';
import { themes } from '../../constants/colors';
import { withTheme } from '../../theme';
import MessageContext from './Context';
import { TGetCustomEmoji } from '../../definitions/IEmoji';

interface IMessageAddReaction {
	theme: string;
}

interface IMessageReaction {
	reaction: {
		usernames: [];
		emoji: object;
	};
	getCustomEmoji: TGetCustomEmoji;
	theme: string;
}

interface IMessageReactions {
	reactions?: object[];
	getCustomEmoji: TGetCustomEmoji;
	theme: string;
}

const AddReaction = React.memo(({ theme }: IMessageAddReaction) => {
	const { reactionInit } = useContext(MessageContext);
	return (
		<Touchable
			onPress={reactionInit}
			key='message-add-reaction'
			testID='message-add-reaction'
			style={[styles.reactionButton, { backgroundColor: themes[theme].backgroundColor }]}
			background={Touchable.Ripple(themes[theme].bannerBackground)}
			hitSlop={BUTTON_HIT_SLOP}>
			<View style={[styles.reactionContainer, { borderColor: themes[theme].borderColor }]}>
				<CustomIcon name='reaction-add' size={21} color={themes[theme].tintColor} />
			</View>
		</Touchable>
	);
});

const Reaction = React.memo(({ reaction, getCustomEmoji, theme }: IMessageReaction) => {
	const { onReactionPress, onReactionLongPress, baseUrl, user } = useContext(MessageContext);
	const reacted = reaction.usernames.findIndex((item: IMessageReaction) => item === user.username) !== -1;
	return (
		<Touchable
			onPress={() => onReactionPress(reaction.emoji)}
			onLongPress={onReactionLongPress}
			key={reaction.emoji}
			testID={`message-reaction-${reaction.emoji}`}
			style={[
				styles.reactionButton,
				{ backgroundColor: reacted ? themes[theme].bannerBackground : themes[theme].backgroundColor }
			]}
			background={Touchable.Ripple(themes[theme].bannerBackground)}
			hitSlop={BUTTON_HIT_SLOP}>
			<View style={[styles.reactionContainer, { borderColor: reacted ? themes[theme].tintColor : themes[theme].borderColor }]}>
				<Emoji
					content={reaction.emoji}
					standardEmojiStyle={styles.reactionEmoji}
					customEmojiStyle={styles.reactionCustomEmoji}
					baseUrl={baseUrl}
					getCustomEmoji={getCustomEmoji}
				/>
				<Text style={[styles.reactionCount, { color: themes[theme].tintColor }]}>{reaction.usernames.length}</Text>
			</View>
		</Touchable>
	);
});

const Reactions = React.memo(({ reactions, getCustomEmoji, theme }: IMessageReactions) => {
	if (!Array.isArray(reactions) || reactions.length === 0) {
		return null;
	}
	return (
		<View style={styles.reactionsContainer}>
			{reactions.map((reaction: any) => (
				<Reaction key={reaction.emoji} reaction={reaction} getCustomEmoji={getCustomEmoji} theme={theme} />
			))}
			<AddReaction theme={theme} />
		</View>
	);
});

Reaction.displayName = 'MessageReaction';
Reactions.displayName = 'MessageReactions';
AddReaction.displayName = 'MessageAddReaction';

export default withTheme(Reactions);
