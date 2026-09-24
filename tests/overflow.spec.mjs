import { test, expect } from '@playwright/test';

const widths=[320,360,375,390,414,768,1024,1280,1440,1920];
for(const width of widths){
  test(`no horizontal overflow at ${width}px`, async ({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto('http://127.0.0.1:3000/fr/');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
