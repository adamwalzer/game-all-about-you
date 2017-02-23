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
            id="how-much-water"
        >
            <skoash.MediaSequence
                ref="vo"
                checkComplete={true}
            >
                <skoash.Audio
                    ref="vo-how-much"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-how-much.mp3`}
                />
                <skoash.Audio
                    ref="vo-water-con"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-water-con.mp3`}
                />
            </skoash.MediaSequence>

            <skoash.Image
                ref="banner"
                className="banner animated"
                src={`${CMWN.MEDIA.IMAGE}text-13-how-much-do-you-know.png`}
            />
            <skoash.Image
                ref="penguin"
                className="penguin animated"
                src={`${CMWN.MEDIA.IMAGE}img-13-penguins.png`}
            />
            <div ref="frame" className="frame animated"></div>
            <skoash.Image
                ref="text-water"
                className="text-water animated"
                src={`${CMWN.MEDIA.IMAGE}text-15-water-conservation.png`}
            />
            <div ref="sub-frame" className="sub-frame animated"></div>
            <skoash.Image
                ref="icon"
                className="icon animated"
                src={`${CMWN.MEDIA.IMAGE}img-15-water-faucet-image.png`}
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
                <skoash.MediaSequence
                    ref="a-lot"
                    checkComplete={true}
                    silentOnStart={true}
                >
                    <skoash.Audio
                        ref="a-lot-expression"
                        type="voiceOver"
                        src={`${CMWN.MEDIA.EFFECT}s-a-lot.mp3`}
                        complete
                    />
                    <skoash.Audio
                        ref="a-lot-vo"
                        type="voiceOver"
                        src={`${CMWN.MEDIA.VO}vo-a-lot.mp3`}
                        complete
                    />
                </skoash.MediaSequence>
                <skoash.MediaSequence
                    ref="a-little"
                    checkComplete={true}
                    silentOnStart={true}
                >
                    <skoash.Audio
                        ref="a-little-expression"
                        type="voiceOver"
                        src={`${CMWN.MEDIA.EFFECT}s-a-little.mp3`}
                        complete
                    />
                    <skoash.Audio
                        ref="a-little-vo"
                        type="voiceOver"
                        src={`${CMWN.MEDIA.VO}vo-a-little.mp3`}
                        complete
                    />
                </skoash.MediaSequence>
                <skoash.MediaSequence
                    ref="not-at-all"
                    checkComplete={true}
                    silentOnStart={true}
                >
                    <skoash.Audio
                        ref="not-at-all-expression"
                        type="voiceOver"
                        src={`${CMWN.MEDIA.EFFECT}s-not-at-all.mp3`}
                        complete
                    />
                    <skoash.Audio
                        ref="not-at-all-vo"
                        type="voiceOver"
                        src={`${CMWN.MEDIA.VO}vo-not-at.mp3`}
                        complete
                    />
                </skoash.MediaSequence>
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
                    <skoash.ListItem className="a-lot animated" data-ref="a-lot" />,
                    <skoash.ListItem className="a-little animated" data-ref="a-little" />,
                    <skoash.ListItem className="not-at-all animated" data-ref="not-at-all" />
                ]}
            />
            <div ref="meter" className="meter animated"></div>
        </skoash.Screen>
    );
}
