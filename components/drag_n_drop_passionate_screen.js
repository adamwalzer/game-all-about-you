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

        if (!this.state.loadingData && !this.state.loadedData) {
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
          id="drag-n-drop-passionate"
        >
            <skoash.Audio
                ref="vo"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-passionate.mp3`}
            />
            <skoash.Image
                ref="penguin"
                className="penguin animated"
                src={`${CMWN.MEDIA.IMAGE}img-s3-penguin-01.png`}
            />
            <skoash.Image
                ref="banner"
                className="banner animated"
                src={`${CMWN.MEDIA.IMAGE}text-what-are-you-passionate-about-copy.png`}
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
                    ref="friends"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-friends.mp3`}
                />
                <skoash.Audio
                    ref="world-peace"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-world-p.mp3`}
                />
                <skoash.Audio
                    ref="sports"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-sports.mp3`}
                />
                <skoash.Audio
                    ref="playing-games"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-playing.mp3`}
                />
                <skoash.Audio
                    ref="looking-cool"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-looking.mp3`}
                />
                <skoash.Audio
                    ref="school"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-school.mp3`}
                />
                <skoash.Audio
                    ref="celebrities"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-celebrities.mp3`}
                />
                <skoash.Audio
                    ref="environment"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-environment.mp3`}
                />
            </MediaCollection>

            <Dropzone
                ref="dropzone"
                centerOnCorrect
                dragRespond={dragRespond}
                correctRespond={correctRespond}
                dropzones={[
                    <skoash.Component className="1 dropzone-list-item animated" />,
                    <skoash.Component className="2 dropzone-list-item animated" />,
                    <skoash.Component className="3 dropzone-list-item animated" />,
                    <skoash.Component className="4 dropzone-list-item animated" />,
                    <skoash.Component className="5 dropzone-list-item animated" />,
                    <skoash.Component className="6 dropzone-list-item animated" />,
                    <skoash.Component className="7 dropzone-list-item animated" />,
                    <skoash.Component className="8 dropzone-list-item animated" />
                ]}
                draggables={[
                    <skoash.ListItem
                        ref="friends"
                        className="draggable-list-item friends animated"
                        message="friends"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="world-peace"
                        className="draggable-list-item world-peace animated"
                        message="world-peace"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="sports"
                        className="draggable-list-item sports animated"
                        message="sports"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="playing-games"
                        className="draggable-list-item playing-games animated"
                        message="playing-games"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="looking-cool"
                        className="draggable-list-item looking-cool animated"
                        message="looking-cool"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="school"
                        className="draggable-list-item school animated"
                        message="school"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="celebrities"
                        className="draggable-list-item celebrities animated"
                        message="celebrities"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="environment"
                        className="draggable-list-item environment animated"
                        message="environment"
                        returnOnIncorrect
                    />
                ]}
            />
<skoash.Component ref="meter" className="meter animated" />
        </skoash.Screen>
    );
}
