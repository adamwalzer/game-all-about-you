import _ from 'lodash';

import MediaCollection from 'shared/components/media_collection/0.1';
import Selectable from 'shared/components/selectable/0.1';

import collectData from './collect_data.js';
import loadData from './load_data.js';

export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            collectData={collectData}
            loadData={loadData}
            id="emoji-friendliness"
        >
            <skoash.Audio
                ref="vo"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-friendly.mp3`}
            />
            <skoash.Image
                ref="penguins"
                className="penguins animated"
                src={`${CMWN.MEDIA.IMAGE}img-10-penguins-circle.png`}
            />
            <skoash.Image
                ref="banner"
                className="banner animated"
                src={`${CMWN.MEDIA.IMAGE}text-10-a-friend-sharesa-game.png`}
            />
            <div ref="frame" className="frame animated"></div>
            <skoash.Image
                ref="penguins-friendly"
                className="penguins-friendly animated"
                src={`${CMWN.MEDIA.IMAGE}img-10-penguins.png`}
            />
            <skoash.Image
                ref="text-friendly"
                className="text-friendly animated"
                src={`${CMWN.MEDIA.IMAGE}text-10-friendliness.png`}
            />

            <MediaCollection
                complete={_.get(props, 'data.game.complete', false)}
                play={_.get(props, 'data.reveal.correct', null)}
                onPlay={function () {
                    this.updateGameState({
                        path: 'reveal',
                        data: {
                            correct: null
                        }
                    });
                }}
            >
                <skoash.Audio ref="correct" type="sfx" src={`${CMWN.MEDIA.EFFECT}s-bu-1.mp3`} />
            </MediaCollection>

            <MediaCollection
                complete={_.get(props, 'data.game.complete', false)}
                play={_.get(props, 'data.reveal.open', null)}
                onPlay={function () {
                    this.updateGameState({
                        path: 'reveal',
                        data: {
                            open: null
                        }
                    });
                }}
            >
                <skoash.Audio
                    ref="happy"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-happy.mp3`}
                    complete
                    delay={1000}
                />
                <skoash.Audio
                    ref="surprised"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-surprised.mp3`}
                    complete
                    delay={1000}
                />
                <skoash.Audio
                    ref="confused"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-confused.mp3`}
                    complete
                    delay={1000}
                />
            </MediaCollection>

            <Selectable
                ref="selectable"
                selectRespond={function (message) {
                    this.updateGameState({
                        path: 'reveal',
                        data: {
                            correct: 'correct',
                            open: message
                        }
                    });
                }}
                completeListOnClick={true}
                chooseOne
                allowDeselect
                list={[
                    <skoash.ListItem className="happy animated" data-ref="happy" />,
                    <skoash.ListItem className="surprised animated" data-ref="surprised" />,
                    <skoash.ListItem className="confused animated" data-ref="confused" />
                ]}
            />
            <div ref="meter" className="meter animated"></div>
        </skoash.Screen>
    );
}
