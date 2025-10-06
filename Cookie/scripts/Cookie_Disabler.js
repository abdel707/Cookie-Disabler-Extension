    /**
     * Read the value of a cookie from its name
     * @param {string} name 
     * @return {string|null} value_cookie | null
     */

    function getCookie(name){
        const cookies = document.cookie.split('; ');
        const value_cookie = cookies.find(c => c.startsWith(name + "="));
        if(!value_cookie){
            return null;
        }
        return decodeURIComponent(value_cookie.split("=")[1]);
    }

    /**
     * 
     * @param {string} name 
     * @param {string} value 
     * @param {number} days 
     */
    function setCookie(name, value, days){
        const date =  new Date()
        date.setDate(date.getDate() + days)
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
    }

    /**
     * Try to clear all accesible cookies
     */
    function clearAllCookies(){
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies){
            const Pos = cookie.indexOf("=");
            const name = Pos > -1 ? cookie.substring(0, Pos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    }

    /**
     * Stimulate the users clicking on rejecting the cookies
     */
    function rejectCookies(){
        if(typeof BCookies !== 'undefined' && typeof BCookies.rejectCookies === 'function'){
            BCookies.rejectCookies();
        }
        localStorage.setItem("NoCookies:)", "0");
        clearAllCookies();
    }


    /**
     * 
     */
    function uncheckedConsentCheckbox(){
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox=>{
            checkbox.checked = false;
        });
    }

    function clickRejectButton(){
        const rejectButton = Array.from(document.querySelectorAll('button, input[type="button"], a, button[aria-label]')).find(element =>
        (element.textContent || '').toLowerCase().includes('reject')||
        (element.textContent || '').toLowerCase().includes('refuser')||
        (element.textContent || '').toLowerCase().includes('decline')||
        (element.textContent || '').toLowerCase().includes("do not consent")||
        (element.textContent || '').toLowerCase().includes('optionnels')||
        (element.textContent || '').toLowerCase().includes("continuer sans accepter")||
        (element.textContent || '').toLowerCase().includes("refuser les cookies optionnels")
        );
        if(rejectButton){
            rejectButton.click();
        }
    }

    /**
     * Unaccept cookies automatically
     */
    window.addEventListener('load', () => {
        uncheckedConsentCheckbox();
        clickRejectButton();
        clearAllCookies();
    });
