export const WebviewSaveLink = `
const createButton = document.createElement('button');
createButton.innerText = '❤️';
createButton.style.position = 'fixed';
createButton.style.bottom = '20px';
createButton.style.right = '30px';
createButton.style.zIndex = '9999';
createButton.style.border = 'none';
createButton.style.outline = 'none';
createButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
createButton.style.color = 'white';
createButton.style.padding = '10px';
createButton.style.borderRadius = '10px';
createButton.style.fontSize = '25px';

createButton.addEventListener('click', function handleClick(event) {
    var dummy = document.createElement('input'),
    text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    if(document.execCommand('copy')){
        window.ReactNativeWebView.postMessage(JSON.stringify({type: 1, msg : "URL copied successfully"}));
    }else{
        window.ReactNativeWebView.postMessage(JSON.stringify({type: 1, msg : "Unable to copy URL"}));
    }
    document.body.removeChild(dummy);
});

document.body.appendChild(createButton);
true;
`;