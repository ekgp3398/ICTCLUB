let puppeteer = require('puppeteer');

async function main() {

    // headless browser start
    const browser = await puppeteer.launch({
        headless: false
    })

    // open new page
    const page = await browser.newPage()

    // connect web link
    await page.goto(
        'https://sae.kangnam.ac.kr/menu/e408e5e7c9f27b8c0d5eeb9e68528b48.do', {
            waitUntil: 'load'
    })

    await page.goto(
        'https://sae.kangnam.ac.kr/menu/e408e5e7c9f27b8c0d5eeb9e68528b48.do')

    let data = [];

    for (let index = 1; index <= 3; index++) {
        await page.goto('https://sae.kangnam.ac.kr/menu/e408e5e7c9f27b8c0d5eeb9e68528b48.do?paginationInfo.currentPageNo=' + index);
        data.push(await getAll(page));
    }
    console.log(data);
    
    await browser.close();
}

async function getAll(page) {
    let data = [];

    const number = await page.$$eval("#subContentWrap > div > div.cont > div > div > div.ul_respon.tbl_num01.devTable > div.tbody > ul", (data) => data.length);
    // ul태그의 개수를 세어서 줄의 개수를 얻은 후에
    for (let index = 0; index < number; index++) {
        data.push(await getOne(page, index + 1));
        // 각 줄의 정보를 얻어서 배열에 Push
    }

    return Promise.resolve(data);
}

async function getOne(page, index) {

    let data = {};

    let temp = await page.$("#subContentWrap > div > div.cont > div > div > div.ul_respon.tbl_num01.devTable > div.tbody > ul:nth-child(" + index + ") > li.black05.ellipsis.even.text-left.li_index1.li_respon.wNaN.w42 > div > a");
    
    data.title = await page.evaluate((data) => {
        return data.title;
    }, temp);

    data.link = await page.evaluate((data) => {
        return data.href;
    }, temp);

    data.writer = await page.$eval("#subContentWrap > div > div.cont > div > div > div.ul_respon.tbl_num01.devTable > div.tbody > ul:nth-child(" + index + ") > li.sliceDot6.odd.li_index4.li_respon.w13 > div", (data) => data.textContent)
    data.major = await page.$eval("#subContentWrap > div > div.cont > div > div > div.ul_respon.tbl_num01.devTable > div.tbody > ul:nth-child(" + index + ") > li.ali.odd.li_index2.li_respon.w12 > div" , (data) => data.textContent);

    return Promise.resolve(data);
}


main()