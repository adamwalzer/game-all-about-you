export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="info"
        >
            <skoash.MediaSequence
                ref="audio-sequence"
                checkComplete={true}
            >
                <skoash.Audio
                    ref="vo"
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}vo-hi-there.mp3`}
                    delay={500}
                />
                <skoash.Audio
                    ref="you"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}s-2-1.mp3`}
                    delay={1000}
                />
            </skoash.MediaSequence>
            <skoash.Image
                ref="penguin-megaphone"
                className="penguin-megaphone animated"
                src={`${CMWN.MEDIA.IMAGE}img-s2-penguin-01.png`}
            />
            <skoash.Image
                ref="spotlight"
                className="spotlight animated"
                src={`${CMWN.MEDIA.IMAGE}img-spotlight-01.png`}
            />
            <skoash.Image
                ref="speech-bubble"
                className="speech-bubble animated"
                src={`${CMWN.MEDIA.IMAGE}img-s2-speechballoon.png`}
            />
            <skoash.Image
                ref="you"
                className="you animated"
                src={`${CMWN.MEDIA.IMAGE}text-you-01.png`}
            />
        </skoash.Screen>
    );
}
