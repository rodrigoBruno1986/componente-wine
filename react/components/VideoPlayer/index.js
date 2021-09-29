import React from 'react';
import { useCssHandles } from 'vtex.css-handles'

const VideoPlayer = (props) => {

    let url, textFalse, autoPlayTrue, viewControlFalse, domain
    let domainVimeo = 'https://player.vimeo.com/video/'
    let domainYoutube = 'https://www.youtube.com/embed/'
    let loopTrue = '&loop=1'
    let muteTrue = '&mute=1'
    let colorControlDefault = "&color=000"
    let styleIframe = {}
    let styleContent = {}
    const nullExp = () => null
    let { urlCustom, posterCustom, plataforma, idVideo, isTextShow, isLoop, isMute, isAutoplay, playsinline, isViewControl, isColorControl, isFullWidth, fullWidthHeight, className } = props

    switch (plataforma) {
        case 'Custom':
            autoPlayTrue = '1'
            viewControlFalse = '1'
            playsinline = ''
            break
        case 'Vimeo':
            // https://developer.vimeo.com/player/sdk/embed
            domain = domainVimeo
            autoPlayTrue = '&autoplay=true'
            viewControlFalse = '&controls=false'
            textFalse = '&title=0&byline=0&portrait=0'
            muteTrue = '&muted=1'
            break
        case 'Youtube':
            // https://developers.google.com/youtube/player_parameters
            domain = domainYoutube
            autoPlayTrue = '&autoplay=1'
            viewControlFalse = '&controls=0'
            textFalse = '&showinfo=0'
            break
        default:
            urlCustom = 'https://statics.glamit.com.ar/media/wysiwyg/c1alandb/home/glamit_720.mp4'
    }


    url = `${domain}${idVideo}?`
    isViewControl ? nullExp() : url += viewControlFalse
    isTextShow ? nullExp() : url += textFalse
    isLoop ? url += loopTrue : nullExp()
    isAutoplay ? url += autoPlayTrue : nullExp()
    isColorControl ? url += `&color=${isColorControl}` : url += colorControlDefault
    isMute ? url += muteTrue : nullExp()
    plataforma === 'Youtube' ? url += '&modestbranding=1' : nullExp()

    if (isFullWidth) {
        styleIframe = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        }
        styleContent = {
            position: 'relative',
            width: '100%',
            height: fullWidthHeight
        }
    }

    const CSS_HANDLES = [
        'VideoPlayer',
        'VideoPlayer-iframe',
        'VideoPlayer-video', 
        'VideoPlayer-source' 
    ]

    const handles = useCssHandles(CSS_HANDLES)

    let IframeHtml = () => {
        if (idVideo !== '') {
            return (
                <div style={styleContent} className={`vtex-flex-layout-0-x-flexRowContent--container-${className} ${handles['VideoPlayer']}`}>
                    <iframe
                        title="videoplayer"
                        src={url}
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        style={styleIframe}
                        className={`vtex-flex-layout-0-x-flexRowContent--${className} ${handles['VideoPlayer-iframe']}`}
                    ></iframe>
                </div>
            )
        } else {
            return null
        }
    }

    let VideoHtml = () => <div style={styleContent} className={`vtex-flex-layout-0-x-flexRowContent--container-${className} ${handles['VideoPlayer']}`}>
        <video
            playsinline={playsinline}
            autoPlay={isAutoplay}
            loop={isLoop}
            controls={isViewControl}
            muted={isMute}
            poster={posterCustom}
            style={styleIframe}
            className={`vtex-flex-layout-0-x-flexRowContent--${className} ${handles['VideoPlayer-video']}`}
        >
            <source src={urlCustom} type="video/mp4" className={`${handles['VideoPlayer-source']}`}/>
        </video>
    </div>

    return (
        <>
           
                {plataforma === 'Custom' ? <VideoHtml /> : <IframeHtml />}
         
        </>
    )
}

VideoPlayer.getSchema = props => {
    return {
        title: 'VideoPlayer',
        type: 'object',
        properties: {
            plataforma: {
                title: 'Plataforma',
                type: 'string',
                enum: ['Custom', 'Youtube', 'Vimeo'],
                default: props.plataforma,
                isLayout: false,
            },
            urlCustom: {
                title: 'URL custom',
                type: 'string',
                default: props.urlCustom,
                isLayout: false,
            },
            posterCustom: {
                title: 'Preview video custom',
                type: 'string',
                default: props.posterCustom,
                isLayout: false,
            },
            idVideo: {
                title: 'Id video',
                type: 'string',
                default: props.idVideo,
                isLayout: false,
            },
            isAutoplay: {
                title: 'Autoplay',
                type: 'boolean',
                default: props.isAutoplay,
                isLayout: false,
            },
            isMute: {
                title: 'Mute',
                type: 'boolean',
                default: props.isMute,
                isLayout: false,
            },
            isLoop: {
                title: 'Loop',
                type: 'boolean',
                default: props.isLoop,
                isLayout: false,
            },
            isTextShow: {
                title: 'Mostrar textos',
                type: 'boolean',
                default: props.isTextShow,
                isLayout: true,
            },
            isColorControl: {
                title: 'Color de controles',
                type: 'string',
                default: props.isColorControl,
                isLayout: true,
            },
            isViewControl: {
                title: 'Mostrar controles',
                type: 'boolean',
                default: props.isViewControl,
                isLayout: false,
            },
            isFullWidth: {
                title: 'Ancho completo',
                type: 'boolean',
                default: props.isFullWidth,
                isLayout: false,
            },
            fullWidthHeight: {
                title: 'Altura de video (agregar unidad)',
                type: 'string',
                default: props.fullWidthHeight,
                isLayout: false,
            },
            className: {
                title: 'Classname (devs)',
                type: 'string',
                default: props.className,
                isLayout: false,
            }
        }
    }
}

VideoPlayer.defaultProps = {
    plataforma: 'Custom',
    urlCustom: 'https://statics.glamit.com.ar/media/wysiwyg/c1alandb/home/glamit_720.mp4',
    posterCustom: 'https://statics.glamit.com.ar/media/wysiwyg/c1alandb/home/glamit_poster.jpg',
    idVideo: '',
    isAutoplay: true,
    isMute: true,
    isLoop: true,
    isTextShow: false,
    isColorControl: "000000",
    isViewControl: true,
    isFullWidth: true,
    fullWidthHeight: "100vh",
    className: "videoplayer-custom"
}

export default VideoPlayer