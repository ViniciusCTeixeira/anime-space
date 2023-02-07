import axios from 'axios';

export async function Sleep(ms: number) {
    await new Promise(
        resolve => setTimeout(resolve, ms)
    )
}

export async function ValidUrl(urlString: string) {
    let urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator

    return await urlPattern.test(urlString);
}

export async function WebsiteInfo(urlString: string) {
    try {
        const response = await axios.get(urlString);
        const html = response.data;

        // Extract title
        const titleStartIndex = html.indexOf('<title>') + 7;
        const titleEndIndex = html.indexOf('</title>');
        const websiteTitle = html.slice(titleStartIndex, titleEndIndex);

        // Extract icon
        const websiteIcon = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${urlString}&size=32`;

        return {title: websiteTitle.split('-')[0].trim().split('|')[0].trim(), icon: websiteIcon};
    } catch ({message}) {
        console.log(message);
        return;
    }
}