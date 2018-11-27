const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const User = mongoose.model("User")

export default (async () => {
    const browser = await puppeteer.launch({
        // headless: true,
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    // await page.goto('https://www.douban.com/group/topic/125772547/');
    await page.goto('https://www.jd.com/?cu=true&utm_source=baidu-pinzhuan&utm_medium=cpc&utm_campaign=t_288551095_baidupinzhuan&utm_term=0f3d30c8dba7459bb52f2eb5eba8ac7d_0_ae69c95911f641b29d11d7356d27f266')
    // await page.screenshot({
    //     path: 'example.png'
    // });
    //等待页面有 comment-item DIV
    // await page.$(".comment-item");
    await page.$("#J_fs_act_lk");
    //相当于在浏览器console里面执行 page.evaluate里面的代码
    try {
        const resulet = await page.evaluate(() => {
            var $ = window.$;
            return $("#J_fs_act_lk").html();
            // var userList = [];
            // var comments = $(".comment-item");
            // comments.each(function (index, item) {
            //     let portraitUrl = $(this).find(".pil").attr("src");
            //     let username = $(this).find(".bg-img-green a").text();
            //     let summary = $(this).find(".reply-doc p").text();
            //     userList.push({
            //         username,
            //         portraitUrl,
            //         summary,
            //     })
            // })
            // return userList
        })
    } catch (err) {
        console.log(err)
    }

    console.log(resulet);
    //写入本地mongoDb
    // resulet.forEach(async (item) => {
    //     var user = new User(item);
    //     await user.save()
    // })

    //await browser.close();
})();