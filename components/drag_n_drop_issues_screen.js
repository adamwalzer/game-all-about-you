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
            id="drag-n-drop-issues"
        >
            <skoash.Audio
                ref="vo"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-world-issues.mp3`}
            />
            <skoash.Image
                ref="penguin"
                className="penguin animated"
                src={`${CMWN.MEDIA.IMAGE}img-s4-penguin-01.png`}
            />
            <skoash.Image
                ref="banner"
                className="banner animated"
                src={`${CMWN.MEDIA.IMAGE}text-worldissues-01.png`}
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
                ref="cyberbullying"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-cyberbullying.mp3`}
            />
            <skoash.Audio
                ref="endangered-animals"
                 type="voiceOver"
                 src={`${CMWN.MEDIA.VO}vo-endangered.mp3`}
                />
            <skoash.Audio
                ref="literacy"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-literacy.mp3`}
            />
            <skoash.Audio
                ref="climate-change"
                 type="voiceOver"
                 src={`${CMWN.MEDIA.VO}vo-climate.mp3`}
                />
            <skoash.Audio
                ref="poverty"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-poverty.mp3`}
            />
            <skoash.Audio
                ref="health-problems"
                 type="voiceOver"
                 src={`${CMWN.MEDIA.VO}vo-health.mp3`}
                />
            <skoash.Audio
                ref="homelessness"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-homelessness.mp3`}
            />
            <skoash.Audio
                ref="safety"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-safety.mp3`}
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
                    <skoash.Component className="dropzone-list-item animated" />,
                    <skoash.Component className="dropzone-list-item animated" />,
                    <skoash.Component className="dropzone-list-item animated" />,
                    <skoash.Component className="dropzone-list-item animated" />
                ]}
                draggables={[
                    <skoash.ListItem
                        ref="cyberbulling"
                        className="draggable-list-item cyberbullying animated"
                        message="cyberbullying"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="endangered-animals"
                        className="draggable-list-item endangered-animals animated"
                        message="endangered-animals"
                         returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="literacy"
                        className="draggable-list-item literacy animated"
                        message="literacy"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="climate-change"
                        className="draggable-list-item climate-change animated"
                        message="climate-change"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="poverty"
                        className="draggable-list-item poverty animated"
                        message="poverty"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="health-problems"
                        className="draggable-list-item health-problems animated"
                        message="health-problems"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="homelessness"
                        className="draggable-list-item homelessness animated"
                        message="homelessness"
                        returnOnIncorrect
                    />,
                    <skoash.ListItem
                        ref="safety"
                        className="draggable-list-item safety animated"
                        message="safety"
                        returnOnIncorrect
                    />
                ]}
            />
  <skoash.Component ref="meter" className="meter animated" />
        </skoash.Screen>
    );
}
