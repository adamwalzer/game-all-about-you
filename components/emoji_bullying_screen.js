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
            id="emoji-bullying"
        >
            <skoash.Audio
                ref="vo"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-bullying.mp3`}
            />
            <skoash.Image
                ref="penguins"
                className="penguins animated"
                src={`${CMWN.MEDIA.IMAGE}img-main-penguins-01.png`}
            />
            <div ref="frame" className="frame animated"></div>
            <div ref="sub-frame" className="sub-frame animated"></div>
            <skoash.Image
                ref="penguins-bullying"
                className="penguins-bullying animated"
                src={`${CMWN.MEDIA.IMAGE}img-s7-bullying-penguins.png`}
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
                    ref="sad"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-sad.mp3`}
                    complete
                    delay={1000}
                />
                <skoash.Audio
                    ref="angry"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-angry.mp3`}
                    complete
                    delay={1000}
                />
                <skoash.Audio
                    ref="no-big-deal"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-no-big.mp3`}
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
                    <skoash.ListItem className="sad animated" data-ref="sad" />,
                    <skoash.ListItem className="angry animated" data-ref="angry" />,
                    <skoash.ListItem className="no-big-deal animated" data-ref="no-big-deal" />
                ]}
            />
            <div ref="meter" className="meter animated"></div>
        </skoash.Screen>
    );
}
