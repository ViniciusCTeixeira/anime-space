export const WebviewSaveLink = `
const createButton = document.createElement('button');
createButton.innerText = '❤️';
createButton.style.position = 'fixed';
createButton.style.bottom = '20px';
createButton.style.left = '20px';
createButton.style.zIndex = '99999';
createButton.style.border = 'none';
createButton.style.outline = 'none';
createButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
createButton.style.color = 'white';
createButton.style.padding = '5px';
createButton.style.borderRadius = '50%';
createButton.style.fontSize = '20px';

createButton.addEventListener('click', function handleClick(event) {
    var dummy = document.createElement('input'),
    text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.body.removeChild(dummy);
});

document.body.appendChild(createButton);

var a = document.getElementsByTagName('a');
for (i in a) {
    if(a[i].target == '_blank'){
        a[i].removeAttribute("target");
        a[i].href = "#";
    }
}
            
true;
`;

export const WebviewTooKit = `
function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}
ready(function() {
    let hidden = true;
    
    const toolButton = document.createElement('a');
    const homeButton = document.createElement('a');
    const reloadButton = document.createElement('a');
    const backButton = document.createElement('a');
    const forwardButton = document.createElement('a');
    
    const linkButton = document.createElement('button');
    
    toolButton.innerText = '⚙️';
    toolButton.style.position = 'fixed';
    toolButton.style.bottom = '20px';
    toolButton.style.left = '20px';
    toolButton.style.zIndex = '99999';
    toolButton.style.border = 'none';
    toolButton.style.outline = 'none';
    toolButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
    toolButton.style.padding = '5px';
    toolButton.style.borderRadius = '50%';
    toolButton.style.fontSize = '20px';
    
    homeButton.innerText = '🏠';
    homeButton.style.position = 'fixed';
    homeButton.style.bottom = '60px';
    homeButton.style.left = '20px';
    homeButton.style.zIndex = '99999';
    homeButton.style.border = 'none';
    homeButton.style.outline = 'none';
    homeButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
    homeButton.style.padding = '5px';
    homeButton.style.borderRadius = '50%';
    homeButton.style.fontSize = '20px';
    homeButton.style.display = "none";
    
    reloadButton.innerText = '🔄';
    reloadButton.style.position = 'fixed';
    reloadButton.style.bottom = '100px';
    reloadButton.style.left = '20px';
    reloadButton.style.zIndex = '99999';
    reloadButton.style.border = 'none';
    reloadButton.style.outline = 'none';
    reloadButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
    reloadButton.style.padding = '5px';
    reloadButton.style.borderRadius = '50%';
    reloadButton.style.fontSize = '20px';
    reloadButton.style.display = "none";
    
    backButton.innerText = '⬅️';
    backButton.style.position = 'fixed';
    backButton.style.bottom = '20px';
    backButton.style.left = '60px';
    backButton.style.zIndex = '99999';
    backButton.style.border = 'none';
    backButton.style.outline = 'none';
    backButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
    backButton.style.padding = '5px';
    backButton.style.borderRadius = '50%';
    backButton.style.fontSize = '20px';
    backButton.style.display = "none";
    
    forwardButton.innerText = '➡️';
    forwardButton.style.position = 'fixed';
    forwardButton.style.bottom = '20px';
    forwardButton.style.left = '100px';
    forwardButton.style.zIndex = '99999';
    forwardButton.style.border = 'none';
    forwardButton.style.outline = 'none';
    forwardButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
    forwardButton.style.padding = '5px';
    forwardButton.style.borderRadius = '50%';
    forwardButton.style.fontSize = '20px';
    forwardButton.style.display = "none";
    
    linkButton.innerText = '❤️';
    linkButton.style.position = 'fixed';
    linkButton.style.bottom = '60px';
    linkButton.style.left = '60px';
    linkButton.style.zIndex = '99999';
    linkButton.style.border = 'none';
    linkButton.style.outline = 'none';
    linkButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
    linkButton.style.padding = '5px';
    linkButton.style.borderRadius = '50%';
    linkButton.style.fontSize = '20px';
    linkButton.style.display = "none";
    
    toolButton.addEventListener('click', function handleClick(event) {
        event.preventDefault();
        if (hidden) {
            homeButton.style.display = "block";
            reloadButton.style.display = "block";
            backButton.style.display = "block";
            forwardButton.style.display = "block";
            linkButton.style.display = "block";
            hidden = false;
        } else {
            homeButton.style.display = "none";
            reloadButton.style.display = "none";
            backButton.style.display = "none";
            forwardButton.style.display = "none";
            linkButton.style.display = "none";
            hidden = true;
        }
    });
    
    homeButton.addEventListener('click', function handleClick(event) {
        event.preventDefault();
        window.location.href = "#d#";
    });
    
    reloadButton.addEventListener('click', function handleClick(event) {
        event.preventDefault();
        window.location.reload();
    });
    
    backButton.addEventListener('click', function handleClick(event) {
        event.preventDefault();
        if (document.referrer != "") {
            history.go(-1);
        };
    });
    
    forwardButton.addEventListener('click', function handleClick(event) {
        event.preventDefault();
        history.go(1);
    });
    
    linkButton.addEventListener('click', function handleClick(event) {
        var dummy = document.createElement('input'),
        text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    });
    
    document.body.appendChild(toolButton);
    document.body.appendChild(homeButton);
    document.body.appendChild(reloadButton);
    document.body.appendChild(backButton);
    document.body.appendChild(forwardButton);
    document.body.appendChild(linkButton);
    
    var a = document.getElementsByTagName('a');
    for (i in a) {
        if(a[i].target == '_blank'){
            a[i].removeAttribute("target");
            a[i].href = "#";
        }
    }
});
true;
`;