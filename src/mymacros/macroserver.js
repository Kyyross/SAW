import { renderToString } from 'vue/server-renderer';

const corsOption= {
  origin: '*',
  credentials:true,           
  optionSuccessStatus:204,
  maxAge: 7200,
  preflightContinue:false
}

async function RenderApp(app){
    return await renderToString(app);
  }

export {RenderApp, corsOption}