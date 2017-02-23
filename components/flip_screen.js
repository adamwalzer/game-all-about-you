export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="flip"
            emitOnComplete={{
                name: 'flip',
            }}
        >
            <skoash.Audio
                ref="vo"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}vo-finished.mp3`}
            />
            <skoash.Image
                ref="frame"
                className="frame animated"
                src={`${CMWN.MEDIA.FRAME}img-17-frame.png`}
            />
            <skoash.Image
                ref="banner"
                className="banner animated"
                src={`${CMWN.MEDIA.IMAGE}text-youvefinished.png`}
            />
            <skoash.Image
                ref="confetti"
                className="confetti animated"
                src={`${CMWN.MEDIA.IMAGE}img-17-confetti.png`}
            />
            <div ref="flip-image" className="flip-image animated"></div>
        </skoash.Screen>
    );
}
