// ** React Import
import { Children } from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
          />
          <link rel='manifest' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' />

          {/* <link rel='icon' type='image/x-icon' href='https://cdn.autodesk.io/favicon.ico' /> */}
          <link
            rel='stylesheet'
            href='https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css'
            type='text/css'
          />
          <script src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/chartjs-plugin-streaming@1.7.1/dist/chartjs-plugin-streaming.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/chartjs-plugin-streaming@1.7.1/dist/chartjs-plugin-streaming.min.js'></script>
          <script src='https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js'></script>
          <link rel='shortcut icon' href='/images/favicon.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script src='https://code.jquery.com/jquery-3.3.1.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>
        <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>

        <script type='text/javascript' src='/js/Extensions/animation.js'></script>
        <script type='text/javascript' src='/js/Extensions/heatmap.js'></script>
        <script type='text/javascript' src='/js/Extensions/issues.js'></script>
        <script type='text/javascript' src='/js/Extensions/IconMarkupExtension.js'></script>
        <script type='text/javascript' src='/js/Extensions/buttons.js'></script>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props =>
        (
          <App
            {...props} // @ts-ignore
            emotionCache={cache}
          />
        )
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => {
    return (
      <style
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
      />
    )
  })

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}

export default CustomDocument
