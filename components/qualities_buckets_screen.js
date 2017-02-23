import _ from 'lodash';

import collectData from './collect_data.js';
import loadData from './load_data.js';

import MediaCollection from 'shared/components/media_collection/0.1';
import Dropzone from 'shared/components/dropzone/0.3';

export default function (props, ref, key) {
    function correctRespond(draggable, dropzoneKey) {
        var dropzone;
        var complete = true;
        var content;
        var totalComplete = 0;
        var message;
        dropzone = this.refs[`dropzone-${dropzoneKey}`];
        content = dropzone.state.content || [];
        message = draggable.props.message;

        if (content.indexOf(draggable) === -1) content.push(draggable);

        dropzone.setState({
            content
        });

        if (!this.state.loadingData) {
            this.updateGameState({
                path: 'sfx',
                data: {
                    play: 'correct'
                }
            });

            this.updateGameState({
                path: 'reveal',
                data: {
                    open: message
                }
            });
        }

        _.forIn(this.refs, (ref2, key2) => {
            if (key2.indexOf('dropzone-') === -1) return;
            if (!ref2.state.content) return complete = false;
            totalComplete += ref2.state.content.length;
            if (totalComplete !== this.draggables.length) complete = false;
        });

        if (complete || _.get(props, 'data.game.complete', false)) this.complete();
    }

    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            collectData={collectData}
            loadData={loadData}
            id="qualities-buckets"
        >
            <skoash.Audio ref="vo" type="voiceOver" src={`${CMWN.MEDIA.VO}vo-buckets.mp3`} />
            <div ref="frame" className="frame animated"></div>
            <skoash.Image
                ref="penguin"
                className="penguin animated"
                src={`${CMWN.MEDIA.IMAGE}img-06-penguin-01.png`}
            />

            <MediaCollection
                ref="sfx-collection"
                complete={_.get(props, 'data.game.complete', false)}
                play={_.get(props, 'data.sfx.play', null)}
                onPlay={function () {
                    this.updateGameState({
                        path: 'sfx',
                        data: {
                            play: null
                        }
                    });
                }}
            >
            <skoash.Audio ref="correct" type="sfx" src={`${CMWN.MEDIA.EFFECT}s-6-1.mp3`} />
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
                    ref="sharing"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-sharing.mp3`}
                />
                <skoash.Audio
                    ref="kindness"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-kindness.mp3`}
                />
                <skoash.Audio
                    ref="rudeness"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-rudeness.mp3`}
                />
                <skoash.Audio
                    ref="being-a-bully"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-being-bully.mp3`}
                />
                <skoash.Audio
                    ref="compassion"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-compassion.mp3`}
                />
                <skoash.Audio
                    ref="greediness"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-greediness.mp3`}
                />
                <skoash.Audio
                    ref="being-angry"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-being-angry.mp3`}
                />
                <skoash.Audio
                    ref="friendliness"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-friendliness.mp3`}
                />
            </MediaCollection>

            <Dropzone
                ref="dropzone"
                correctRespond={correctRespond}
                dropzones={[
                    <skoash.Component className="dropzone-list-item animated" multipleAnswers />,
                    <skoash.Component className="dropzone-list-item animated" multipleAnswers />
                ]}
                draggables={[
                    <skoash.ListItem
                        ref="sharing"
                        className="draggable-list-item sharing animated"
                        message="sharing"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="kindness"
                        className="draggable-list-item kindness animated"
                        message="kindness"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="rudeness"
                        className="draggable-list-item rudeness animated"
                        message="rudeness"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="being-a-bully"
                        className="draggable-list-item being-a-bully animated"
                        message="being-a-bully"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="compassion"
                        className="draggable-list-item compassion animated"
                        message="compassion"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="greediness"
                        className="draggable-list-item greediness animated"
                        message="greediness"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="being-angry"
                        className="draggable-list-item being-angry animated"
                        message="being-angry"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="friendliness"
                        className="draggable-list-item friendliness animated"
                        message="friendliness"
                        returnOnIncorrect
                    />
                ]}
            />
            <div ref="meter" className="meter animated"></div>
        </skoash.Screen>
    );
}
