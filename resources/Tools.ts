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

        let websiteTitle: string = html.slice(titleStartIndex, titleEndIndex);
        websiteTitle = websiteTitle.split('-')[0].trim().split('|')[0].trim().split(':')[0].trim().split('&#8211;')[0].trim();
        websiteTitle = websiteTitle.replace(/(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');

        // Extract icon
        const gstatic: string = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${urlString}&size=32`;
        const websiteIconBase64 = await urlToBase64(gstatic);
        let websiteIcon: string

        if (typeof websiteIconBase64 === 'string') {
            websiteIcon = websiteIconBase64;
        }else{
            websiteIcon = gstatic;
        }


        return { title: websiteTitle, icon: websiteIcon };
    } catch (message: any) {
        console.log(message);
        return;
    }
}

export async function urlToBase64(urlString: string) {
    try {
        let base64 = await fetch(urlString)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));

        if (typeof base64 === 'string') {
            return base64 ?? "";
        }

        return "";

    } catch (message: any) {
        console.log(message);
        return;
    }
}