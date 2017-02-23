import _ from 'lodash';

import collectData from './collect_data.js';
import loadData from './load_data.js';

import MediaCollection from 'shared/components/media_collection/0.1';
import Dropzone from 'shared/components/dropzone/0.3';

export default function (props, ref, key) {
    function dragRespond(draggable) {
        this.updateGameState({
            path: 'sfx',
            data: {
                play: 'drag'
            }
        });

        _.forIn(this.refs, (ref2, key2) => {
            if (key2.indexOf('dropzone-') === -1) return;
            if (ref2 && ref2.state && ref2.state.content === draggable) {
                ref2.setState({
                    content: null
                });
            }
        });

        this.incomplete();
    }

    function correctRespond(draggable, dropzoneKey) {
        var dropzone;
        var message;
        var complete = true;

        dropzone = this.refs[`dropzone-${dropzoneKey}`];
        message = draggable.props.message;

        if (dropzone.state.content && draggable !== dropzone.state.content) {
            dropzone.state.content.returnToStart();
            dropzone.state.content.markIncorrect();
        }

        dropzone.setState({
            content: draggable
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

        _.forIn(this.refs, (ref3, key3) => {
            if (key3.indexOf('dropzone-') === -1) return;
            if (!ref3.state.content) {
                return complete = false;
            }
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
            id="drag-n-drop-interests"
        >
            <skoash.Audio
                ref="vo"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-most-interested.mp3`}
            />
            <skoash.Image
                ref="penguin"
                className="penguin animated"
                src={`${CMWN.MEDIA.IMAGE}img-16-penguins.png`}
            />
            <skoash.Image
                ref="banner"
                className="banner animated"
                src={`${CMWN.MEDIA.IMAGE}text-16-what-are-interested.png`}
            />
            <skoash.Component ref="frame" className="frame animated" />

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
                <skoash.Audio ref="drag" type="sfx" src={`${CMWN.MEDIA.EFFECT}s-bu-2.mp3`} />
                <skoash.Audio ref="correct" type="sfx" src={`${CMWN.MEDIA.EFFECT}s-bu-3.mp3`} />
            </MediaCollection>

            <MediaCollection
                ref="media-collection"
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
                    ref="space"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-space.mp3`}
                />
                <skoash.Audio
                    ref="animals"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-animals.mp3`}
                />
                <skoash.Audio
                    ref="recycling"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-recycling.mp3`}
                />
                <skoash.Audio
                    ref="money"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-money.mp3`}
                />
                <skoash.Audio
                    ref="printing"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-3d-print.mp3`}
                />
                <skoash.Audio
                    ref="coding"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-coding.mp3`}
                />
                <skoash.Audio
                    ref="art"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-art.mp3`}
                />
                <skoash.Audio
                    ref="robotics"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-robotics.mp3`}
                />
            </MediaCollection>

            <Dropzone
                ref="dropzone"
                centerOnCorrect
                dragRespond={dragRespond}
                correctRespond={correctRespond}
                dropzones={[
                    <skoash.Component className="dropzone-list-item animated" />,
                    <skoash.Component className="dropzone-list-item animated" />,
                    <skoash.Component className="dropzone-list-item animated" />,
                    <skoash.Component className="dropzone-list-item animated" />,
                    <skoash.Component className="dropzone-list-item lanimated" />,
                    <skoash.Component className="dropzone-list-item animated" />,
                    <skoash.Component className="dropzone-list-item animated" />,
                    <skoash.Component className="dropzone-list-item animated" />
                ]}
                draggables={[
                    <skoash.ListItem
                        ref="space"
                        className="draggable-list-item space animated"
                        message="space"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="animals"
                        className="draggable-list-item animals animated"
                        message="animals"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="recycling"
                        className="draggable-list-item recycling animated"
                        message="recycling"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="money"
                        className="draggable-list-item money animated"
                        message="money"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="printing"
                        className="draggable-list-item printing animated"
                        message="printing"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="coding"
                        className="draggable-list-item coding animated"
                        message="coding"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="art"
                        className="draggable-list-item art animated"
                        message="art"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="robotics"
                        className="draggable-list-item robotics animated"
                        message="robotics"
                        returnOnIncorrect
                    />
                ]}
            />
            <skoash.Component ref="meter" className="meter animated" />
        </skoash.Screen>
    );
}
