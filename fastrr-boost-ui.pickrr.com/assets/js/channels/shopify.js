try {

var Razorpay;
var retryTimeOut;

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

var uuid = uuidv4().substr(0,8)

var updated_collection_array = []
const pickCartFromLS = ["ranbazaar.com", "thehouseofrare.com", "aramya.in", "blackberrys.com"]

try {

  if((!localStorage.getItem("landingPageUrl") || new Date(Date.now()) > new Date(localStorage.getItem('landingPageExpireTime'))) && window.location.host === "theurbangadget.com") {
    localStorage.setItem("landingPageUrl", window.location.href)
    localStorage.setItem("landingPageExpireTime", new Date(new Date().setDate(new Date().getDate() + 7)))
  }
} catch (e) {

}

var HttpCall = function (url, method, data, success, failure) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  if(url === "https://uptime.fastrr.com/fe2") {
    xhr.timeout = 2000;
  }

  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }


  // fallback
  const DONE =  (typeof XMLHttpRequest.DONE !== 'undefined') ? XMLHttpRequest.DONE : 4;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === DONE) {
      let status = xhr.status;
      let response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch (e) {
        response = xhr.responseText;
      }

      if (status === 0 || (status >= 100 && status < 300)) {
        if (typeof success === 'function') {
          return success(response);
        }
      } else {
        if (typeof failure == 'function') {
          return failure(response);
        }
      }
    }
  };
};


// try {
  const min = 1000000000; 
  const max = 9999999999; 
  let randomNumDigits = Math.floor(Math.random() * (max - min + 1)) + min;
  randomNumDigits = randomNumDigits.toString();

  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  
  var randomNumber = `${randomNumDigits}:${year}-${day}-${month}`
  var enhanced_conversion_data={}


// } catch (e) {}




var HeadlessCheckout;
(async () => {
  if (typeof checkoutApi == 'undefined') {
    checkoutApi = 'https://srca-api-qa-1.kartrocket.com';
  }

  if (typeof checkoutV2Api == 'undefined') {
    checkoutV2Api = 'https://checkout-v2-api-qa-1.kartrocket.com';
  }

  if (typeof checkoutBuyer == 'undefined') {
    checkoutBuyer = 'https://fastrr-boost-ui.pickrr.com/';
  }


  try {
    const urlSearchParams = new URLSearchParams(window.location.search); 
    if(urlSearchParams.get("fastrrCouponCode")) {
      localStorage.setItem("fastrrCouponCode", urlSearchParams.get("fastrrCouponCode"))
    }
  } catch (e) {
  }

  let Domains = {
    checkoutApi: checkoutApi,
    checkoutV2Api: checkoutV2Api,
    checkoutBuyer: checkoutBuyer,
  };

  let Store = {
    data: {},
  };
  let CheckoutEvents = {};
  let CheckoutActions = {};

  var credInstalled;
  var session_id;
  var client_id;
  var tracking_ga_id = "G-123";

  try{
    function gtag(){dataLayer.push(arguments);}
    if(tracking_ga_id){
      gtag('get',tracking_ga_id,'session_id', (field)=> {   
        session_id = field;   
      })
      
      gtag('get',tracking_ga_id,'client_id', (field)=> {
        client_id = field;
      })
    }
  }catch(error){}


  try {
    const supportedPaymentMethods = [{
      supportedMethods: ["https://cred.club/checkout/pay"]
    }]
  
    const paymentDetails = {
      total: {
        label: "dummy data",
        amount: {
          currency: "INR",
          value: "10.00"
        }
      }
    }
  
    const paymentRequest = new PaymentRequest(
      supportedPaymentMethods,
      paymentDetails
    );
  
    const canMakePaymentPromise = paymentRequest.canMakePayment();
    canMakePaymentPromise.then((result) => {
      if (!result) {
        credInstalled = false
        return;
      }
      credInstalled = true
    })
      .catch((err) => {
      });

  } catch (e) {
    credInstalled = false
  }


  var isFastrrUp = 1
  var ipAddress = null

 
  HttpCall(
    'https://uptime.fastrr.com/fe2', 
    'GET', 
    null, 
    function(response) {

      if(Number(response.status) === 0 || Number(response.status) === 1) {
        isFastrrUp = Number(response.status)
      } else {
        isFastrrUp = 1
      }

      if(response.ip) {
        ipAddress = response.ip
      }

    },
    function(error) {
      isFastrrUp = 1
    }
  )


  let appMakerBeginCheckout = function (data) {
    const postData = JSON.stringify(data);
    window.ReactNativeWebView.postMessage(postData)
  };

  let CheckoutActionHandler = function (actions) {
    if (actions && actions.length > 0) {
      for (let action of actions) {
        if (typeof CheckoutActions[action.action] === 'function') {
          CheckoutActions[action.action](action.data);
        }
      }
    }
  };

  let WigzoHandler = function (data){
    if(data?.eventName === "configure"){
      (function (w, i, g, z, o) {
        var a, m;
        w["WigzoObject"] = o;
        w[o] =
          w[o] ||
          function () {
            (w[o].q = w[o].q || []).push(arguments);
          };
        w[o].l = 1 * new Date();
        w[o].h = z;
        a = i.createElement(g);
        m = i.getElementsByTagName(g)[0];
        a.async = 1;
        a.src = z;
        m.parentNode.insertBefore(a, m);
      })(
        window,
        document,
        "script",
        "https://app.wigzo.com/wigzo.compressed.js",
        "wigzo"
      );
      window.wigzo("configure", data?.data)    
    }else if(data?.eventName === "track"){
      window.wigzo("track", data?.data?.eventName, data?.data?.wigzoProperties)
    }else if(data?.eventName === "identify"){
      window.wigzo("identify", {
        phone: data?.data?.phone,
      });    
    }else if(data?.eventName === "trackBuy"){
      window.wigzo("track", "buy", data?.data);    
    }else if(data?.eventName === "identifyEmail"){
      window.wigzo("identify", data?.data,["email"]);    
    }
  }

  let WebengageHandler = function (data){
    if(data?.eventName === 'Checkout created'){
      window?.webengage?.track("Shiprocket checkout created", data?.data)
    }else if(data?.eventName === 'login'){
      window?.webengage?.user?.login(data?.data)
    }else if(data?.eventName === 'we_phone'){
      window?.webengage?.user?.setAttribute('we_phone',data?.data)
    }else if(data?.eventName === 'we_first_name'){
      window?.webengage?.user?.setAttribute('we_first_name',data?.data)
    }else if(data?.eventName === 'we_last_name'){
      window?.webengage?.user?.setAttribute('we_last_name',data?.data)
    }else if(data?.eventName === 'we_email'){
      window?.webengage?.user?.setAttribute('we_email',data?.data)
    }else if(data?.eventName === 'Checkout updated'){
      window?.webengage?.track("Shiprocket checkout updated", data?.data)
    }
  }

  const loadscript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
    }
    document.body.append(script)
    })
  }

  const razorpayStandard = (data) => {
    loadscript("https://checkout.razorpay.com/v1/checkout.js").then(() => {
        let rzp = new Razorpay(data)
        rzp.open()
      })
  }

  const cashfreeStandard = (data) => {
    loadscript("https://sdk.cashfree.com/js/v3/cashfree.js").then(() => {
    const cashfree = Cashfree({
        mode:"production" //or sandbox
    });

    let checkoutOptions = {
      paymentSessionId: data,
      redirectTarget: "_self" //optional (_self or _blank)
    }

    cashfree.checkout(checkoutOptions)
  })
  }

  const setCookie = (data) => {
    var exdate = new Date(data.time);
    exdate.setDate(exdate.getDate());
    document.cookie =
      encodeURIComponent(data.name) +
      '=' +
      encodeURIComponent(data.data) +
      '; expires=' +
      exdate.toUTCString()+';path=/;SameSite=None;Secure';
  }

  const setCookieAnalytics = (data) => {
    var exdate = new Date(data.time);
    exdate.setDate(exdate.getDate());
    document.cookie =
      encodeURIComponent(data.name) +
      '=' +
      encodeURIComponent(JSON.stringify(data.data)) +
      '; expires=' +
      exdate.toUTCString()+';path=/;SameSite=None;Secure';
  }
  
  const openTrueCaller = (data, payload) => {
    window.open(data, '_top')
    setTimeout(() => {
      if(document.hasFocus()) {
      } else {
          document.getElementById('headless-iframe')?.contentWindow?.postMessage(
            { trigger: "true-caller-request", payload}, checkoutBuyer
          )
      }
    }, 600)
  }

  const hidePreloader = () => {
    document.getElementById('fastrr-pre-loader').style.display = "none"
  }

  const stopCheckoutButtonLoader = () => {
    try{
      if(document.querySelector('.loader5')){
      document.querySelector('.loader5').style.display = "none";
      document.querySelector('.sr-checkout-visible2').style.display = "inline-block";
      document.querySelector('.sr-checkout-visible').style.display = "inline-block";
      document.querySelector('.sr-checkout-visible1').style.display = "inline-block";
      document.querySelector('.sr-headless-checkout').style.opacity = "1";
      let disableButton = document.querySelectorAll('.sr-headless-checkout');
        disableButton.forEach((value) => {
          value.disabled = "false"
        })
    }

    if(document.querySelector('.sr-checkout-loader')){
      document.querySelector('.sr-checkout-loader').style.display = "none";  
      document.querySelector('.sr-checkout-visible-button1').style.display = "inline-block";
      document.querySelector('.sr-checkout-visible2-button1').style.display = "inline-block";
      document.querySelector('.sr-checkout-visible1-button1').style.display = "inline-block";
      document.querySelector('.sr-headless-checkout-button1').style.opacity = "1";
      document.querySelector('.sr-headless-checkout-button1').disable = false;
    }

    // document.querySelector('.sr-headless-checkout').disabled = "false";

  }catch(e){
    //console.log(e);
  }
  }

  const buttonLoader = () => {
    try{
      if(document.querySelector('.loader5')){
        document.querySelector('.loader5').style.display = "block";
        document.querySelector('.sr-checkout-visible').style.display = "none";
        document.querySelector('.sr-checkout-visible2').style.display = "none";
        document.querySelector('.sr-checkout-visible1').style.display = "none";
        document.querySelector('.sr-headless-checkout').style.opacity = ".7";
        let disableButton = document.querySelectorAll('.sr-headless-checkout');
        disableButton.forEach((value) => {
          value.disabled = true
        })
      }
      

      if(document.querySelector('.sr-checkout-loader')){
        document.querySelector('.sr-checkout-loader').style.display = "block";  
        document.querySelector('.sr-checkout-visible-button1').style.display = "none";
        document.querySelector('.sr-checkout-visible2-button1').style.display = "none";
        document.querySelector('.sr-checkout-visible1-button1').style.display = "none";
        document.querySelector('.sr-headless-checkout-button1').style.opacity = ".7";
        document.querySelector('.sr-headless-checkout-button1').disable = true;
      }
    }catch(e){}
  }


  function postRedirect(url) {
    const str = url?.toString();
    // Regular expression patterns to match phone and order_number
    const phonePattern = /phone=([^&]+)/;
    const orderNumberPattern = /order_number=([^&]+)/;

    // Match the phone and order_number values using regular expressions
    const phoneMatch = str.match(phonePattern);
    const orderNumberMatch = str.match(orderNumberPattern);

    // Extract the values
    const phone = phoneMatch ? phoneMatch[1] : null;
    const orderNumber = orderNumberMatch ? orderNumberMatch[1] : null;

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", url);
    form.setAttribute("target", "_parent")

    var phoneInput = document.createElement("input");
    phoneInput.type = "hidden";
    phoneInput.name = 'phone';
    phoneInput.value = phone;
    form.appendChild(phoneInput); 

    var orderInput = document.createElement("input");
    orderInput.type = "hidden";
    orderInput.name = 'order_number';
    orderInput.value = orderNumber;
    form.appendChild(orderInput);

    document.querySelector?.('body')?.appendChild(form);
    form.submit();

    }

    const fetchCollectionId = async (data) => {

      try {

      for(let i=0; i<data?.products?.length; i++) { 

        const response = await fetch(`https://${data?.seller_domain}/api/2021-07/graphql.json`, {
          method: "POST",
          headers: {
            'X-Shopify-Storefront-Access-Token': data?.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: "query getProductById($id: ID!) {\n  product(id: $id) {\n    id\n    collections(first: 50) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n}",
            variables: {"id":`gid://shopify/Product/${data?.products[i]?.product_id}`}
          })
        });

        const resolvedResponse = await response.json()

        if(resolvedResponse?.data?.product?.collections?.edges) {


          let current_item = data?.products[i]
          let new_collection_ids_array = []
          for(let j = 0; j<resolvedResponse?.data?.product?.collections?.edges?.length; j++) { 
            let new_collection_id = resolvedResponse?.data?.product?.collections?.edges?.[j]?.node?.id?.replace("gid://shopify/Collection/", "")
                if(!current_item?.collection_id?.includes(new_collection_id)) {
                  new_collection_ids_array.push(new_collection_id)
                }
          }

          if(new_collection_ids_array?.length > 0){
            updated_collection_array.push({
              productId: resolvedResponse?.data?.product?.id?.replace("gid://shopify/Product/", ""),
              collectionId: new_collection_ids_array
            })
          }
        }

      }

      if(updated_collection_array?.length > 0) {

        const payload = {
          sellerId: data?.seller_id,
          channel: data?.channel?.toUpperCase(),
          itemDetails: updated_collection_array
        }

        document.getElementById('headless-iframe').contentWindow.postMessage(
          { trigger: "sync-catalogue", data: payload }, checkoutBuyer
        )
        
      }
      
      } catch (e) {

      }
    }

  
  let CheckoutMessageListener = function (event) {
    // @TODO uncomment origin check after testing
    // if (checkoutBuyer.indexOf(event.origin) === -1 && checkoutApi.indexOf(event.origin) === -1) {
    //   return;
    // }
    const urlSearchParams = new URLSearchParams(window.location.search);    

    let data = event.data;
    switch (data.trigger) {
      case 'headless-close':
        
        if(urlSearchParams.get('fastrrPromotion') || urlSearchParams.get('cart_id') || urlSearchParams.get('cart-resume-id') || urlSearchParams.get('fastrr_transaction_id') || urlSearchParams.get('fastrr_status')){
          window.location = 'https://'+window.location.hostname;
          ExitCheckout();
        }else {
          // window.location.reload();
          ExitCheckout();
        }
        stopListeningMessage() 
        break;
      case 'headless-complete':
        ExitCheckout();
        CheckoutActionHandler(data.actions);
        break;
      case 'headless-redirect':
        CheckoutActionHandler(data.actions);
        break;

      case 'headless-storage':
        CheckoutActionHandler(data.actions);
        break;
      case 'headless-payment':
        CheckoutActionHandler(data.actions);
        break;
      case 'headless-iframe-loaded':
        CheckoutActionHandler(data.actions);
        break;
      case 'gtag':
        gtag('event', data.data.event, data.data.data);
        break;
      case 'gtm-events':
        pushGtmEvents(data.data);
        break;
      case "convesion-gtm-event":{
        enhanced_conversion_data=data?.enhanced_conversion_data
        gtag('config',data?.config?.configId, {...data?.config?.configObject});
        gtag('event',data?.eventName,data.conversionData);
        break;
      }
      case 'headless-payment-close':
        ExitRazorpay()
        break;
        case 'headless-payment-hide':
          HideRazorpay()
          break;
        case 'reload-iframe':
          ReloadIframe(data.data)
        break;
        case 'clear-cart':
          CheckoutActionHandler(data.actions);
          break;
        case 'appmaker-begin-checkout':
          appMakerBeginCheckout(data.actions);
          break;
        case 'Wigzo': 
          WigzoHandler(data)
          break;
        case 'Webengage': 
          WebengageHandler(data)
          break;
         case 'razorpay-standard-checkout':
          razorpayStandard(data?.data)
          break; 

        case 'cashfree-standard-checkout':
          cashfreeStandard(data?.data)
        break; 

        case 'otp-read-start':
          startListeningMessage() 
          break;
        case 'otp-read-stop':
          stopListeningMessage() 
          break;
        case 'open-true-caller':
          openTrueCaller(data?.data, data?.payload) 
          break; 
        case 'stop-checkout-button-loader':
          stopCheckoutButtonLoader()
          break; 
         case 'init-checkout':
           InitiateCheckout(data?.store, data?.type, data?.cart, data?.url, data?.couponCode, data?.isUpsell)
           break;
          case 'set-cookie':
            setCookie(data?.data)
            break;
        case 'set-analytics-cookie':
          setCookieAnalytics(data?.data)
          break;
        case 'hide-pre-loader':
          hidePreloader()
          break;
        case 'headless-redirect-post':
            postRedirect(data.data);
          break;
        case 'ga-session-id-parent':
          ga_session_id(data.data);
          break; 
        case 'time-calculate': 
          timeCalucate(data.data);
          break;
        case 'fetch-collection-id':
            fetchCollectionId(data?.data)
          break;
        default:
          break;
    }
  };

  let CheckoutWatch = function (mutations) {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeName.toUpperCase() == 'FORM' ||
            node.nodeName.toUpperCase() == 'DIV'
          ) {
            if (node.classList.contains('shiprocket-headless')) {
              PrepareCheckoutButton(node);
            } else {
              let containers = node.getElementsByClassName(
                'shiprocket-headless'
              );
              for (let container of containers) {
                PrepareCheckoutButton(container);
              }
            }
          }
        });
      }
    });
  };

  let FetchChannelToken = function (callback) {
    let channelToken = localStorage.getItem('channelToken');
    if (channelToken) {
      if (typeof callback === 'function') {
        return callback(channelToken);
      }
    }

    HttpCall(
      Domains.checkoutV2Api + '/v2/channel/code?code=SH',
      'GET',
      null,
      function (response) {
        channelToken = response.data.token;
        localStorage.setItem('channelToken', channelToken);
        if (typeof callback === 'function') {
          return callback(channelToken);
        }
      },
      function (error) {
      }
    );
  };

  let InitializeStore = function (token) {
    let storeUrl = window.Shopify.shop;
    if (storeUrl) {
      Store.url = storeUrl;
    }

    if (!Store.url) {
      console.error("Can't initialize checkout, store url is required");
      return;
    }

    Store.paymentIframeId = 'headless-payment-iframe';

    let channelInfo = localStorage.getItem('channelInfo');
    try {
      channelInfo = JSON.parse(channelInfo);
    } catch (err) {
      console.error(err);
      channelInfo = null;
    }

    if (
      channelInfo &&
      channelInfo.expiry > new Date().getTime() &&
      channelInfo.shop_name
    ) {
      Store.data = channelInfo;
      LoadCheckoutButton();
    } else {
      return ValidateStore(token);
    }
  };

  let ValidateStore = function (token) {
    let ttl = 86400; // 1 Day
    let validationData = JSON.stringify({
      shop_url: Store.url,
      code: 'SH',
      token: token,
    });

    HttpCall(
      Domains.checkoutV2Api + '/v2/channel/validate',
      'POST',
      validationData,
      function (response) {
        let channelResponse = response.data;
        channelResponse.expiry = new Date().getTime() + ttl;
        localStorage.setItem('channelInfo', JSON.stringify(channelResponse));
        Store.data = channelResponse;
        LoadCheckoutButton();
      }
    );
  };


  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // time calculate
  const timeCalucate = (data) => {
    console.log(data, 'checking the data')

    HttpCall(
      'https://events.pickrr.com/collect',
      'POST',
      JSON.stringify({
        ...data
      }), 
      function (response) {
        // console.log(response, 'checking the response')
      }, 
      function(response){
        // console.log(response)
      }
    );
  }






  let InitiateCheckout = function (
    store, 
    type, 
    cart = [], 
    url, 
    couponCode, 
    isUpsell = false, 
    sendApi = false, 
    masonPayload, 
    appmakerUrl, 
    isAppmaker, 
    cartAttributes, 
    token
    ) {

    try {

    let fastrrContainer = document.createElement('div')
    fastrrContainer.id = 'fastrr-main-container'
    document.body.appendChild(fastrrContainer)

    const urlSearchParams = new URLSearchParams(window.location.search); 

    if(!urlSearchParams.get('fastrr_transaction_id') && !urlSearchParams.get('fastrr_status')) {
      let preLoader = document.createElement('div')
      preLoader.id = 'fastrr-pre-loader'
      preLoader.classList = "fastrr-pre-loader-container"
      preLoader.innerHTML = 
      `<div class="fastrr-pre-loader"> 
        <div class="animation-container">
          <div class="animation-loader">
        </div>
          <div class="animation-image-div"></div>      
          <img
            src="
            https://fastrr-boost-ui.pickrr.com/assets/images/shiprocket_logo_1.png"
            class="animation-image"
          />
        </div>
        <div class="splash__text">Initiating Checkout</div>
        <div id="redirect-text-fastrr" class="redirect-button-fastrr" style="visibility:hidden;">Hmm..🤔 having to wait? <br/><a href="${url}" style="color:blue;">Click here</a> to speed things up ⚡️</div>
        <div class="redirect-button-fastrr" style="position: absolute; bottom:0; font-size: 10px; color: #9e9e9e; padding: 20px! important;">${typeof uuid === "string" ? uuid : ""}</div>
      </div>`
      fastrrContainer.appendChild(preLoader)
    }

    if(!urlSearchParams.get('cart-resume-id')) {
      retryTimeOut = setTimeout(() => {
        document.getElementById('redirect-text-fastrr').style.visibility = ''
      }, 10000)
    }

    const cart_id = urlSearchParams.get('cart_id');

    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');
    const couponCodeCookie = getCookie('discount_code')
    const isUpsellCookie = getCookie('isUpsellFastrr')
    let utm_params = getCookie('_shopify_sa_p')
    const timeVisited = getCookie('_shopify_sa_t')

    if(timeVisited) {
      utm_params ? utm_params += '%26time_visited%3D' + timeVisited : utm_params = 'time_visited%3D' + timeVisited
    }

    let widgetUrl = Domains.checkoutBuyer + '?';
    widgetUrl +=
      'channel=' +
      window.btoa(
        encodeURIComponent(
          JSON.stringify({
            channel_id: 119,
            channel_code: 'SH',
            seller_id: 1,
            sr_company_id: '704',
            shop_name: 'company-logo',
            shop_url: document.getElementById('sellerDomain')?.value
            ? document.getElementById('sellerDomain')?.value
            : window.location.host,
            shop_logo:
              'https://srca-api-qa-1.kartrocket.com/storage/assets/Meeraaki-logo.png',
            expiry: 1649275586138,
            redirectUrl: url,
            credInstalled: credInstalled
          })
        )
      );
    widgetUrl += '&type=' + type;
    
    if(token){
      widgetUrl += '&platform=' + 'CUSTOM';
    }else {
      widgetUrl += '&platform=' + 'SHOPIFY';
    }

    if(pickCartFromLS?.includes(document.getElementById('sellerDomain')?.value) && urlSearchParams.get('application') !== "appmaker") {
      localStorage.setItem('fastrrCart', window.btoa(encodeURIComponent(JSON.stringify(cart))))
    } else {
      widgetUrl +=
      '&cart=' + window.btoa(encodeURIComponent(JSON.stringify(cart)));
    }

    if(cart_id) {
      widgetUrl += '&cart_id=' + cart_id
    }
    if(fbp){
      widgetUrl += '&fbp=' + fbp;
    }
    if(fbc){
      widgetUrl += '&fbc=' + fbc;
    }

    if(ipAddress) {
      widgetUrl += '&ipAddress=' + ipAddress;
    }
    
    if(masonPayload) {
      widgetUrl += '&masonPayload=' + window.btoa(encodeURIComponent(JSON.stringify(masonPayload)));
    }
    
    try {
      if(utm_params) {
        widgetUrl += '&utm_params=' + window.btoa(unescape(utm_params))
      } 
    } catch (e) {}

    try {
      if(uuid) {
        widgetUrl += '&uuid=' + uuid
      }
    } catch (e) {}
 
    if(couponCode) {
      widgetUrl += '&afterSellCoupon=' + couponCode
    }
    
    if(couponCodeCookie && !couponCode) {
      widgetUrl += '&couponCodeCookie=' + couponCodeCookie
    }

    if(isUpsell) {
      widgetUrl += '&isUpsell=' + true
    }

    if(cartAttributes){
      widgetUrl += '&cartAttributes=' + window.btoa(encodeURIComponent(JSON.stringify(cartAttributes)));
    }

    // for thehatke - add fastrrPromotion for promotion
    if(urlSearchParams.get('fastrrPromotion')){
      widgetUrl += '&fastrrPromotion=fastrrPromotion';
    }


    // for headless checkout - override widget URL completly and add params
    if(urlSearchParams.get('cart-resume-id')){
      widgetUrl = Domains.checkoutBuyer + '?cart-resume-id=' + urlSearchParams.get('cart-resume-id')
    }

    if(urlSearchParams.get('cart-resume-id') && urlSearchParams.get('seller-domain')) {
      widgetUrl += '&seller-domain=' + urlSearchParams.get('seller-domain')
    }

    if(token){
      widgetUrl += '&customCheckoutToken='+token
    }

    if(token){
      widgetUrl += '&customCheckoutToken='+token
    }
    
    if(token){
      const utm_source = urlSearchParams.get('utm_source') ?? null ;
      const utm_medium = urlSearchParams.get('utm_medium') ?? null;
      const utm_campaign = urlSearchParams.get('utm_campaign') ?? null;

      const utm_param = {
        utm_source, 
        utm_medium, 
        utm_campaign
      }
      
      widgetUrl += '&utm_params_custom=' + window.btoa(encodeURIComponent(JSON.stringify(utm_param)));
    }

    // ga4 Logic
    if(session_id && tracking_ga_id){
      const ga4Details = {
        session_id: session_id, 
        client_id: client_id, 
        tracking_ga_id: tracking_ga_id
      }
      widgetUrl += '&ga4Details=' + window.btoa(encodeURIComponent(JSON.stringify(ga4Details)));
    }

    if(urlSearchParams.get('cart-resume-id') && !urlSearchParams.get('seller-domain')) {
      widgetUrl += '&channel=' + window.btoa(
        encodeURIComponent(
          JSON.stringify({
            shop_url: document.getElementById('sellerDomain')?.value
            ? document.getElementById('sellerDomain')?.value
            : window.location.host
          })
        )
      );
    }

    if(urlSearchParams.get('cart-resume-id') && urlSearchParams.get('type')) {
      widgetUrl += '&type=' + urlSearchParams.get('type')
    }

    if(urlSearchParams.get('fastrr_transaction_id') && urlSearchParams.get('seller_id')) {
      widgetUrl = Domains.checkoutBuyer + '?fastrr_transaction_id=' + urlSearchParams.get('fastrr_transaction_id') + '&seller_id=' + urlSearchParams.get('seller_id') + '&seller=' + urlSearchParams.get('seller')
    }

    if(isUpsellCookie) {
      widgetUrl += '&is_upsell=' + isUpsellCookie
    }

    if(urlSearchParams.get('fastrr_status')) {
      widgetUrl = Domains.checkoutBuyer + '?fastrr_status=' + urlSearchParams.get('fastrr_status')
    }

    if(urlSearchParams.get('isFastrrProduct')) {
      widgetUrl = Domains.checkoutBuyer + '?isFastrrProduct=' + urlSearchParams.get('isFastrrProduct')
      widgetUrl += '&cart=' + window.btoa(encodeURIComponent(JSON.stringify(cart)));
      widgetUrl += '&seller-domain=' + urlSearchParams.get('seller-domain');
    }



    const bodyStyle = document.body.style;
    store.bodyStyle = {
      // position: bodyStyle.position,
      top: bodyStyle.top,
    };
    bodyStyle.top = `-${window.scrollY}px`;
    // bodyStyle.position = 'fixed';
    bodyStyle.overflow = 'hidden'

    if (document.getElementById('headless-container')) {
      const url = isAppmaker === "appmaker" ? appmakerUrl : widgetUrl;
      document.getElementById('headless-iframe').src = url;
    } else {
      let headlessApplication = document.createElement('div');
      const url = isAppmaker === "appmaker" ? appmakerUrl : widgetUrl;
      headlessApplication.id = 'headless-container';
      headlessApplication.innerHTML = `<div class="headless-modal">
          <div class="headless-modal-content">
            <div class="headless-modal-body">
              <iframe id="headless-iframe" src="${url}"></iframe>
            </div>
          </div>
        </div>`;

        isAppmaker === "appmaker" ? 
        document.body.append(headlessApplication) 
        : fastrrContainer.prepend(headlessApplication);
    }

    if(sendApi) {
      HttpCall(
        'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
        'POST', 
        JSON.stringify({
          "event_type": "POST_BUTTON_CLICK",
          "type": type?.toUpperCase(),
          "host": window.location.host
        }), 
        null,
        null
      )
    }}catch(e){
      HttpCall(
        'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
        'POST', 
        JSON.stringify({
          "event_type": "POST_BUTTON_CLICK_ERROR",
          "id" : randomNumber ?? "NA",
          "host": window.location.host,
          "error" : e.message ? e.message : e?.response?.data?.message
        }), 
        null,
        null
      )
    }
  };

  let ExitCheckout = function () {
    const bodyStyle = document.body.style;
    const scrollY = bodyStyle.top;
    // bodyStyle.position = Store.bodyStyle.position;
    // bodyStyle.top = Store.bodyStyle.top;
    document.getElementById('headless-container').remove();
    if(document.getElementById('fastrr-main-container')){
      document.getElementById('fastrr-main-container').remove();
    }
    document.querySelector('body').style.overflow = "auto";
    let disableButton = document.querySelectorAll('.sr-headless-checkout');
        disableButton.forEach((value) => {
          value.removeAttribute("disabled")
          // value.disabled = "false"
        })
    clearTimeout(retryTimeOut);
    CheckoutActions.removeIframe(null);
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };

  const ExitRazorpay = () => {
    document.getElementsByClassName('headless-payment-iframe')[0].remove();
  }

  const pushData = (data) => {
    try{
      window.dataLayer.push(data);
    }catch(error){
      //
    }
  };

  function ga_session_id(data) {
    let sessionId;
    let clientId;

      gtag('get',data,'session_id', (field)=> {     
        sessionId = field;   
        console.log(field, 'checking the field')
        document.getElementById('headless-iframe')?.contentWindow?.postMessage(
          { trigger: "ga-session-id", field}, checkoutBuyer
        )
      })
      gtag('get',data,'client_id', (field)=> {
        clientId = field;
        console.log(field, 'checking the field clinet id')
        document.getElementById('headless-iframe')?.contentWindow?.postMessage(
          { trigger: "ga-client-id", field}, checkoutBuyer
        )
      })

  }


  const pushGtmEvents = (data) => {
    pushData(data)
  }

  const HideRazorpay = () => {
    document.getElementsByClassName('headless-payment-iframe')[0].style.backgroundColor = 'transparent'
  }

  const ReloadIframe = (src) => {
    document.getElementById('headless-iframe').src = src;
  }

  let CheckoutButtonInnerHTML = function () {
    let buttonConfig = { template: 'all', discount: { type: '', value: '0' } };
    if (Store.data.checkout_button && Store.data.checkout_button.template) {
      buttonConfig = Store.data.checkout_button;
    }
    let button_text = 'BUY NOW';
    let discount_text = '';
    buttonConfig.discount.type=document.getElementById('discountType')?.value;
    buttonConfig.discount.value=document.getElementById('discValue')?.value;
    buttonConfig.template=document.getElementById('template')?.value;
    buttonConfig.customText=document.getElementById('customText')?.value;
    if (buttonConfig.discount && parseInt(buttonConfig.discount.value)) {
      switch (buttonConfig.discount.type) {
        case 'flat':
          discount_text = '&#8377;' + buttonConfig.discount.value;
          break;
        case 'percent':
          discount_text = buttonConfig.discount.value + '%';
          break;
      }
      discount_text = `Extra ${discount_text} Off on`;
    }
    switch (buttonConfig.template) {
      case 'cod':
        button_text += ' with COD';
        discount_text = '';
        break;
      case 'upi':
        button_text += ' with UPI';
        discount_text = discount_text ? discount_text + ' UPI' : '';
        break;
      case 'cod-upi':
        button_text += ' with UPI / COD';
        discount_text = discount_text ? discount_text + ' UPI' : '';
        break;
      case 'all':
        discount_text = discount_text ? discount_text + ' Prepaid Orders' : '';
        break;
      case 'rz':
        discount_text = discount_text ? discount_text + ' Prepaid Orders' : '';
      break;
      case 'custom': 
        button_text = "BUY NOW"
      break;
      case 'cash-on-delivery':
        button_text += ' with Cash On Delivery'
        break;
      case 'custom-text':
        button_text = buttonConfig.customText
        break;
      default:
        button_text += ' with UPI / COD';
        
    }
    let html =
      `<div class="sr-d-flex flex-center"><div class="sr-d-flex full-width flex-center">` +
      (buttonConfig.template === 'cod' ? '' : ``) +
      `<span class="sr-checkout-visible2">${button_text}</span> ${buttonConfig.template !== "cash-on-delivery" ? `<img src="${checkoutBuyer}assets/images/boost_button/upi_options.svg" alt="Google Pay | Phone Pay | UPI" class="sr-pl-15 sr-checkout-visible" /><div class ="loader5"></div><img src="${checkoutBuyer}assets/images/boost_button/right_arrow.svg" class="sr-pl-15 sr-checkout-visible1" alt="right_arrow" />` : ""}</div><div>` +
      (discount_text
        ? `<span class="sr-discount-label"> ${discount_text} </span>`
        : '') +
      `<span class="sr-powered-by"><img src="${checkoutBuyer}assets/images/boost_button/powered_by.svg " alt="" /></span></div></div>`;
    return html;
  };

  let PrepareCheckoutButtonCheck = function () {
    if (window.location.host === "peachmode.com") {
      if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Calcutta" || Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Kolkata") {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  let PrepareCheckoutButton = function (container) {
    if(PrepareCheckoutButtonCheck()) {
    let buttonType = container.getAttribute('data-type');
    let headlessButton = document.createElement('button');
    headlessButton.type = 'button';
    headlessButton.className = 'sr-headless-checkout';
    headlessButton.innerHTML = CheckoutButtonInnerHTML();
    if (container.childElementCount == 0) {
      if (buttonType == 'product') {
        headlessButton.setAttribute(
          'onclick',
          'HeadlessCheckout.buyNow(event)'
        );
      } else if (buttonType == 'mini-cart') {
        headlessButton.setAttribute(
          'onclick',
          'HeadlessCheckout.checkout(event)'
        );
      } else {
        headlessButton.setAttribute(
          'onclick',
          'HeadlessCheckout.checkout(event)'
        );
      }
      container.appendChild(headlessButton);
    }
    }
  };

  let LoadCheckoutButton = function () {
    let headlessContainers = document.getElementsByClassName(
      'shiprocket-headless'
    );
    if (!headlessContainers) {
      console.error('Shiprocket Checkout not configured correctly');
      return;
    }

    for (let container of headlessContainers) {
      PrepareCheckoutButton(container);
    }
  };

  CheckoutActions.clearCart = function (data) {
    HttpCall(
      'https://' + window.location.host + '/cart/clear.js',
      'POST',
      null,
      function () {
        if (data.redirectTo) {
          window.location.href = data.redirectTo;
        }
      }
    );
  };
  CheckoutActions.redirectTo = function (data) {
    if (data.url) {
      window.location.href = data.url;
    }
  };

  CheckoutActions.loadStorage = function (data) {
    document.getElementById('headless-iframe').contentWindow.postMessage(
      {
        trigger: 'headless-storage',
        data: JSON.stringify(window.localStorage),
      },
      checkoutBuyer
    );
  };

  CheckoutActions.setItem = function (data) {
    localStorage.setItem(data.key, data.value);
  };

  CheckoutActions.removeItem = function (data) {
    localStorage.removeItem(data.key);
  };

  CheckoutActions.createIframe = function (data) {
    var paymentIframe = document.getElementById(Store.paymentIframeId);
    if (!paymentIframe) {
      paymentIframe = document.createElement('iframe');
      paymentIframe.id = Store.paymentIframeId;
      paymentIframe.src = Domains.checkoutBuyer + 'razorPay.html';
      paymentIframe.classList.add('headless-payment-iframe');
      document.body.appendChild(paymentIframe);
    }
    paymentIframe.style.display = 'none';
  };

  CheckoutActions.markIframeLoaded = function (data) {
    var paymentIframe = document.getElementById(Store.paymentIframeId);
    if (paymentIframe) {
      paymentIframe.setAttribute('data-loaded', 1);
    }
  };

  CheckoutActions.createPayment = function (data) {
    var paymentIframe = document.getElementById(Store.paymentIframeId);
    if (paymentIframe && paymentIframe.getAttribute('data-loaded')) {
      paymentIframe.contentWindow.postMessage(
        { trigger: 'headless-create-payment', data: data },
        checkoutBuyer
      );
      paymentIframe.style.display = '';
    } else {
      setTimeout(() => {
        CheckoutActions.createPayment(data);
      }, 250);
    }
  };

  CheckoutActions.removeIframe = function (data) {
    var paymentIframe = document.getElementById(Store.paymentIframeId);
    if (paymentIframe) {
      paymentIframe.remove();
    }
  };

  CheckoutActions.paymentStatus = function (data) {
    document
      .getElementById('headless-iframe')
      .contentWindow.postMessage(
        { trigger: 'headless-payment-status', actions: data.actions },
        checkoutBuyer
      );
  };

  CheckoutEvents.buyNow = function (event) {
    event.stopPropagation();
    HttpCall(
      'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
      'POST', 
      JSON.stringify({
        "event_type": "BUTTON_CLICK",
        "type": "PRODUCT",
        "host": window.location.host
      }), 
      null,
      null
    )

    try{
    let checkoutButton = event.currentTarget;
    buttonLoader()
    
    // visibilityHideItem.forEach((value) => {
    //   value.style.display = "none"
    // })

    // let productForm = checkoutButton.closest("form[action='/cart/add']");
    let productForm;
    // let productForm = checkoutButton.closest("form[action='/cart/add']");
    // getting form action because of Localization https://kartrocket.atlassian.net/browse/CO-826
    const closestForm = checkoutButton.closest('form');
    const closestFormAction = closestForm.getAttribute('action');
    if (closestFormAction.includes('/cart/add')) {
      productForm = closestForm;
    }
    let productUrl = window.location.pathname;

    let productFormData = new FormData(productForm);
    let variantIdSelected = productFormData.get('id');
    let qty = parseInt(productFormData.get('quantity'));
    let giftWrap = productFormData.get('attributes[gift-message-note]')

    if(productUrl == "/" || 
      window.location.host === "krishnaayurved.com" || 
      window.location.host === "upakarna.com" ||
      window.location.host ==='zaribanaras.com' || window.location.host === "blanc9.com" || window.location.host === "www.davesnoni.com" || window.location.host === "kikibix.com" || window.location.host === "b12greenfood.com" || document.getElementById("fastrrCollectionPage")?.value === 'true'
    ) {
      productUrl = productFormData.get('productUrl')
    }
    
    if (productUrl == '/') {
      try {
        // themes tend to have anchor to product page adjacent to form.
        productUrl = productForm.parentElement
          .querySelector('a')
          .href.split(/[?#]/)[0];
      } catch (error) {
        console.error('Cannot find Product URL.');
        return;
      }
    }

    HttpCall(productUrl + '.js', 'GET', null, function (product) {

      let variant;
      for (let productVariant of product.variants) {
        if (productVariant.id == variantIdSelected) {
          variant = productVariant;
          break;
        }
      }

      // If the variant is not available, let's not do anything
      if (!product.available || !(variant && variant.available)) {
        return;
      }

      // let optionsArr = [];
      // product.options.forEach((element) => {
      //   let optionKey = element["name"];
      //   if (productFormData.get(optionKey)) {
      //     optionsArr.push({
      //       name: optionKey,
      //       value: productFormData.get(optionKey),
      //     });
      //   }
      // });
      let properties = {}
      if(giftWrap){
        properties = {
          ...properties,
          _giftWrap : 'yes',
          gift_note : giftWrap
        }
      }

      let productToBuy = {
        productId: product.id,
        title: variant?.name ? variant?.name: product?.title,
        variantId: variant.id,
        variantTitle: variant.public_title ? variant.title : '',
        price: parseFloat((variant.price / 100).toFixed(2)),
        quantity: (isNaN(qty) || qty === 0) ? 1 : qty,
        image: variant?.featured_image ? variant?.featured_image?.src : product.media[0].src,
        // optionsArr:optionsArr,
        item_meta_data: {
          properties: variant.properties,
        },
        customAttributes: properties,
        vendor:product?.vendor,
        product_type:product?.type
      };

      const url  = `http://${window.location.host}/cart/${productToBuy.variantId}:${productToBuy.quantity}`;

      if(isFastrrUp === 1) {
      InitiateCheckout(Store, 'product', [productToBuy], url, '', false, true);
      HttpCall(
        'https://' + window.location.host + '/cart/add.js',
        'POST',
        JSON.stringify({
          items: [
            {
              id: productToBuy.variantId,
              quantity: productToBuy.quantity
            }
          ]
        }),
        null
      );
      } else {
        window.location.href = url
      }
    });
  }catch(e){
    HttpCall(
      'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
      'POST', 
      JSON.stringify({
        "event_type": "BUTTON_CLICK_ERROR",
        "id" : randomNumber ?? "NA",
        "host": window.location.host,
        "error" : e.message ? e.message : e?.response?.data?.message
      }), 
      null,
      null
    )
  }
  };

  CheckoutEvents.checkout = function (event) {
    event.stopPropagation();
    HttpCall(
      'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
      'POST', 
      JSON.stringify({
        "event_type": "BUTTON_CLICK",
        "type": "CART",
        "host": window.location.host
      }), 
      null,
      null
    )
    buttonLoader();
  try{
    HttpCall('/cart.js', 'GET', null, function (cart) {
      
      localStorage.removeItem('shopifyCart')
      localStorage.setItem('shopifyCart', JSON.stringify(cart))

      let cartToBuy = [];
      let cartData = "";


      for (let item of cart.items) {
        cartToBuy.push({
          productId: item.product_id,
          title: item?.title ? item?.title : item?.product_title,
          variantId: item.variant_id,
          variantTitle: item.product_has_only_default_variant
            ? ''
            : item.variant_title,
          price: parseFloat((item.price / 100).toFixed(2)),
          quantity: item.quantity,
          image:  window.location.host === "myxtur.com" ? item?.properties?.image  ? item.properties.image : item.image : item.image,
          optionsArr: item.product_has_only_default_variant
            ? []
            : item.options_with_values,
          item_meta_data: {
            properties: item.properties,
          },
          customAttributes: item.properties,
          vendor:item?.vendor,
          product_type:item?.type
        });

        cartData = cartData + item.variant_id+':'+item.quantity+','
      }
      
      let cartAttributes;
      // if(window.location.host === 'in.imbesharam.com'){
        cartAttributes = {cartAttributes: cart?.attributes}
      // }
    
      if(window.location.hostname === "www.bluenectar.co.in"){
        const currentCart = window.currentCart.items;
        if(currentCart?.length > 0){
        const difference = currentCart.filter(item2 => {
          return !cartToBuy.some(item1 => item1.productId === item2.product_id && item1.variantId === item2.variant_id);
        });
        
        difference.forEach((value) => {
          cartToBuy.push({
            productId: value?.product_id,
            title: '',
            variantId: value?.variant_id,
            variantTitle: '',
            price: '',
            quantity: value?.quantity,
            image: '',
            optionsArr: [],
            item_meta_data: {
              properties: '',
            },
            customAttributes: ''
          });
        })
      }
    }

      const url  = `http://${window.location.host}/cart/${cartData}`;
      
      if(isFastrrUp === 1) {
        if(cartToBuy?.length === 0) {
          window.location.href = `https://${window.location.hostname}/cart`
          HttpCall(
            'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
            'POST', 
            JSON.stringify({
              "event_type": "EMPTY_CART",
              "id" : randomNumber ?? "NA",
              "host": window.location.host,
              "cart" : cartData
            }), 
            null,
            null
          )
        } else {
          InitiateCheckout(Store, 'cart', cartToBuy, url, '' , false, true, '', '', '', cartAttributes);
        }
      } else {
        window.location.href = url
      }
    });
  }catch(e){
    HttpCall(
      'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
      'POST', 
      JSON.stringify({
        "event_type": "BUTTON_CLICK_ERROR",
        "id" : randomNumber ?? "NA",
        "host": window.location.host,
        "error" : e.message ? e.message : e?.response?.data?.message
      }), 
      null,
      null
    )
  }
  };

  CheckoutEvents.addToCart = function (event, token) {
    event?.stopPropagation();
    HttpCall(
      'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
      'POST', 
      JSON.stringify({
        "event_type": "BUTTON_CLICK",
        "type": "PRODUCT",
        "host": window.location.host
      }), 
      null,
      null
    )

    try{
      if(isFastrrUp === 1) {
        // HttpCall(
        //   'https://fastrr-api-dev.pickrr.com/api/v1/test/access-token/checkout?seller_id=658d38a7a887d2f25727e04a',
        //   'POST',
        //   JSON.stringify({
        //     "cart_data": {
        //         "items": [
        //             {
        //               "variant_id": "1244539923890450",
        //               "quantity": 1
        //             }
        //         ]
        //     },
        //     "redirect_url": "https://test-checkout-1234.requestcatcher.com/test/?key=rizwan",
        //     "timestamp": "2023-12-29T11:45:33.085563Z"
        // }),
        //   function (response) {
        //     InitiateCheckout(Store, 'cart', '', '', '', '', '', '', '', '', '', response?.result?.token);
        //   }, 
        // null
        // );

      InitiateCheckout(Store, 'cart', '', '', '', '', '', '', '', '', '', token);

      // HttpCall(
      //   'https://' + window.location.host + '/cart/add.js',
      //   'POST',
      //   JSON.stringify({
      //     items: [
      //       {
      //         id: productToBuy.variantId,
      //         quantity: productToBuy.quantity
      //       }
      //     ]
      //   }),
      //   null
      // );
      } else {
        window.location.href = url
      }
  }catch(e){
    HttpCall(
      'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
      'POST', 
      JSON.stringify({
        "event_type": "BUTTON_CLICK_ERROR",
        "id" : randomNumber ?? "NA",
        "host": window.location.host,
        "error" : e?.message ? e?.message : e?.response?.data?.message
      }), 
      null,
      null
    )
  }
  };

  // CheckoutEvents.InitiateDirectCheckout = (store, type, cart = [], url, couponCode) => {
  //   InitiateCheckout(store, type, cart, url, couponCode)
  // }
  CheckoutEvents.InitiateDirectCheckout = (store, type, cart = [], url, couponCode, customAttributes) => {

    let fastrrRedirectUrl = `https://${window.location.host}/cart/`

    for(let item of cart) {
      fastrrRedirectUrl = fastrrRedirectUrl + item.variantId+ ':' +item.quantity + ','
    }

    if(isFastrrUp === 1) {
      InitiateCheckout(store, type, cart, fastrrRedirectUrl, couponCode, false, false, null, "", false, customAttributes)
    } else {
      window.location.href = fastrrRedirectUrl
    }

  }

  CheckoutEvents.InitiateMasonCheckout = (masonPayload) => {

    let masonCart = []
    let url = `https://${window.location.host}/cart/`

    for(let item of masonPayload.items) {

      masonCart.push({
        "variantId": item.id, 
        "quantity": item.quantity
      })

      url = url + item.id+ ':' +item.quantity + ','

    }

    InitiateCheckout("", "cart", masonCart, url, masonPayload.discounts[0]?.code, false, false, masonPayload)

  }

  window.addEventListener('message', CheckoutMessageListener, false);



  function getId (text){
    const pattern = /[^/]*$/;      
    const product_match_regex = pattern.exec(text); // Use exec to find the matchx
    return product_match_regex[0] // Check if a match was found
  } 
  
  function getDomain(url){
    const regex = /^(https?:\/\/)?([^\/]+)/i;
    const url_match_regex = regex.exec(url);
    // The host will be in the second capturing group (index 2)
    const host = url_match_regex && url_match_regex[2];  
    return host; 
  }

  window.addEventListener('load', function(){
    const urlSearchParams = new URLSearchParams(window.location.search);    
    const application = urlSearchParams.get('application');
    if(application === "appmaker"){

    let cart = urlSearchParams.get('cart');
    let url = urlSearchParams.get('webUrl');
    let sellerDomain = urlSearchParams.get('sellerDomain');
    const couponCode = urlSearchParams.get('couponCode');
    const cartAttributesGet = urlSearchParams.get('cartAttributes');
    let isBaseEncode = urlSearchParams.get('isBaseEncode');
    let cartAttributesParseData;

    if(isBaseEncode){
      cartAttributesParseData = window.atob(cartAttributesGet);
      cartAttributesParseData = JSON.parse(cartAttributesParseData)
    }else {
      cartAttributesParseData = JSON.parse(cartAttributesGet)
    }

    let finalCartAttribute = {};

    if(cartAttributesParseData){
       cartAttributesParseData?.forEach((attributes) => {
        finalCartAttribute[attributes.key] = attributes.value;
      })
    }

    cartAttributesParseData = cartAttributesParseData ? finalCartAttribute : '';

    let cartAttributes;
    cartAttributes = {cartAttributes: cartAttributesParseData}

    if(isBaseEncode){
      cart = window.atob(cart);
      cart = JSON.parse(cart);
    }else {
      cart = JSON.parse(cart);
    }

    const lineItems = cart?.map((obj) => {
      return {
        productId:getId(obj?.node?.variant?.product?.id?.toString()),
        shop_url:getDomain(obj?.node?.variant?.product?.onlineStoreUrl),
        quantity: obj?.node?.quantity,
        // customAttributes: obj?.node?.customAttributes,
        title: obj?.node?.variant?.product?.title,
        variantId: getId(obj?.node?.variant?.id?.toString()),
        variantTitle: '',
        price: obj?.node?.variant?.price?.amount,
        image:  obj?.node?.variant?.image?.url
      }
    })

    const finalCart = isBaseEncode ? cart : lineItems;
    
    let widgetUrl = 'https://fastrr-boost-ui.pickrr.com/' + '?';
    let domain = sellerDomain ? sellerDomain : "www.gharsoaps.shop"

     widgetUrl +=
      'channel=' +
      window.btoa(
        encodeURIComponent(
          JSON.stringify({
            shop_url: domain, 
            shop_logo: '',
            expiry: 1649275586138,
            redirectUrl: url
          })
        )
      );

      widgetUrl += '&type=cart';
      widgetUrl += '&platform=' + 'SHOPIFY';
      widgetUrl += '&cart=' + window.btoa(encodeURIComponent(JSON.stringify(finalCart)));
      widgetUrl +='&application=' + 'appmaker';
      if(couponCode) {
        widgetUrl += '&couponCodeCookie=' + couponCode;
      }
      if(cartAttributes){
        widgetUrl += '&cartAttributes=' + window.btoa(encodeURIComponent(JSON.stringify(cartAttributes)));
      }  
    if(cart && application){
      InitiateCheckout(Store, 'cart', [], '', '', '', '', '', widgetUrl, application);
    }

    }

  }) 


  window.addEventListener('load', function(){
    const urlSearchParams = new URLSearchParams(window.location.search);    
    const cart_id = urlSearchParams.get('cart_id');
    if(cart_id){
      InitiateCheckout(Store, 'cart', cartToBuy = []); 
    }
  }) 

  window.addEventListener('load', function(){
    const urlSearchParams = new URLSearchParams(window.location.search);    
    const fastrrPromotion = urlSearchParams.get('fastrrPromotion');
    if(fastrrPromotion){
      InitiateCheckout(Store, 'cart', [{variantId: 16854465282119, quantity: 1}]);
    }
  }) 

  window.addEventListener('load', function(){
    const urlSearchParams = new URLSearchParams(window.location.search);    
    const cartResumeId = urlSearchParams.get('cart-resume-id');
    if(cartResumeId){
      InitiateCheckout(Store, 'cart', []);
    }
  }) 


  function redirectCheckoutOpen() {
    const urlSearchParams = new URLSearchParams(window.location.search);    
      const fastrrTransactionId = urlSearchParams.get('fastrr_transaction_id');
      const seller_id = urlSearchParams.get('seller_id');
      if(fastrrTransactionId && seller_id){
        InitiateCheckout(Store, 'cart', []);
      }
  }
  
    if(document?.readyState === 'complete'){
      redirectCheckoutOpen();
    }else {
      window.addEventListener('load', function(){
        redirectCheckoutOpen();
      }) 
    }

  window.addEventListener('load', function(){
    const urlSearchParams = new URLSearchParams(window.location.search);    
    const fastrrStatus = urlSearchParams.get('fastrr_status');
    if(fastrrStatus){
      InitiateCheckout(Store, 'cart', []);
    }
  }) 

  window.addEventListener('load', function(){
    const urlSearchParams = new URLSearchParams(window.location.search);    
    const isFastrrProduct = urlSearchParams.get('isFastrrProduct');

    if(isFastrrProduct) {
      let products = urlSearchParams.get('products')

      products = products?.split(',')
  
      let cartArray = []
  
      for(let i=0; i<products?.length; i++) {
        cartArray.push({
          variantId: products[i].split(":")[0],
          quantity: products[i].split(":")[1]
        })
      }
        InitiateCheckout(Store, 'cart', [...cartArray]);
    }
  }) 

  window.addEventListener('load', function () {
    if (typeof Store.data != 'undefined') {
      LoadCheckoutButton();
    }
    const observer = new MutationObserver(CheckoutWatch);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });

  const ac = new AbortController();
  const FetchAndAutofillOtp = (e) => {
    navigator.credentials.get({
      otp: { transport:['sms'] },
      signal: ac.signal
    }).then((otp ) => {
      document.getElementById('headless-iframe').contentWindow.postMessage(
        { trigger: "otp-autofill", data: otp.code },checkoutBuyer
      )
    }).catch((err ) => {
    });
  }

  const startListeningMessage = () => {
    if ('OTPCredential' in window) {
      window.addEventListener('load', FetchAndAutofillOtp());
    }
  }

  const stopListeningMessage = () => {
    ac.abort()
    window.removeEventListener('load', FetchAndAutofillOtp());
  }

  LoadCheckoutButton();
  return CheckoutEvents;
})().then((result) => (HeadlessCheckout = result));
} catch(e){
  HttpCall(
    'https://webhookreceiver.pickrr.com/wh/v1/event/checkout/button', 
    'POST', 
    JSON.stringify({
      "event_type": "SCRIPT_ERROR",
      "id" : randomNumber ?? "NA",
      "host": window.location.host,
      "error" : e.message ? e.message : e?.response?.data?.message
    }), 
    null,
    null
  )
}
