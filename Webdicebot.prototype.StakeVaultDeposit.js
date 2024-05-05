// Thank Tobi much about that
// Read about it: https://github.com/rainbot-ch/Webdicebot.prototype.UserVaultDeposit

const WDB_API = "https://api-bot.mhqb365.com";
const CASINO_GAME = location.host.includes("shuffle")
  ? `shuffle-${location.href.includes("limbo") ? "limbo" : "dice"}`
  : location.host.includes("stake")
  ? `stake-${location.href.includes("limbo") ? "limbo" : "dice"}`
  : location.host.includes("jacksclub")
  ? `jacksclub-${location.href.includes("blaze") ? "blaze" : "dice"}`
  : "primedice";
(async () => {
  await fetch(`${WDB_API}/stable/init`)
    .then((response) => response.text())
    .then((txt) => eval(txt))
    .then(async () => {
      await new Promise((resolve) => {
        let awaitFengari = setInterval(
          () =>
            !!window.fengari &&
            !Boolean(window.fengari?.lua?.LUA_OK) &&
            resolve(clearInterval(awaitFengari)),
          0x52
        );
      });
    });
  fengari.load("function vault(amount)\n js.global:vault(amount) \nend")();
  return location.host.includes("jacksclub")
    ? window.eval(
        JSON.parse(
          "\"async function vault(amount){\\n    let response=await fetch(new URL(`https://api.jacksclub.io/graphql`),{\\n        method:'POST',\\n        headers:new Headers({\\n            'Content-Type':'text/plain;charset=utf-8',\\n            authorization:JSON.parse(decodeURIComponent(document.cookie.match(RegExp('token=([^;]+)'))[1])).id,\\n        }),\\n        body:JSON.stringify({\\n            query:'fragment Result on VaultResult{credit{transfer value version currency}debit{transfer value version currency}} mutation Deposit($amount:Float!,$currency:SpendableCurrency!){vault{deposit(input:{amount:$amount,currency:$currency}){...Result}}}',\\n            variables:{\\n                amount:amount.toFixed(8),\\n                currency:document.querySelector('#wdbMenuCoin').value,\\n            },\\n        }),\\n    })\\n    let result=await response.json();\\n    let balanceUpdate=typeof checkbalance=='function'?await checkbalance():void(0);\\n    console.log('%o%o %s %o',['VaultDeposit'],{[result.data.vault.deposit.credit.currency.toUpperCase()]:Number(result.data.vault.deposit.credit.transfer).toFixed(8)},['ⅈ'],[Number(result.data.vault.deposit.credit.value).toFixed(8)]);\\n}\""
        )
      )
    : location.host.includes("shuffle")
    ? window.eval(
        JSON.parse(
          '"async function vault(amount){\\r\\n    let response=await fetch(new URL(\\"https://shuffle.com/graphql\\"),{\\r\\n        headers:new Headers({\\r\\n            \\"content-type\\":\\"application/json;charset=UTF-8\\",\\r\\n            \'authorization\':\\"Bearer \\"+JSON.parse(JSON.parse(localStorage.getItem(\\"persist:root\\")).auth).accessToken,\\r\\n            \\"x-correlation-id\\":`${localStorage.getItem(\'BROWSER_ID\')}-${crypto.randomUUID().substr(26)}-1${crypto.randomUUID().substr(28)}-${crypto.randomUUID().substr(31)}::${localStorage.getItem(\\"CORRELATION_USER_ID\\")}`,\\r\\n        }),\\r\\n        body:JSON.stringify([{\\r\\n            operationName:\\"VaultDeposit\\",\\r\\n            variables:{\\r\\n                data:{\\r\\n                    currency:document.querySelector(\\"#wdbMenuCoin\\")?.value||document.querySelector(\\"#balance-button>img\\")?.alt?.toUpperCase(),\\r\\n                    amount:amount.toFixed(8),\\r\\n                }\\r\\n            },\\r\\n            query:\\"mutation VaultDeposit($data:VaultDepositInput!){vaultDeposit(data:$data){id type currency amount createdAt}}\\"\\r\\n        },{\\r\\n            operationName:\\"GetAccount\\",\\r\\n            variables:{\\r\\n                currency:\\"USD\\"\\r\\n            },\\r\\n            query:\\"query GetAccount($currency:FiatCurrency!){me{id username email emailVerifiedAt vipLevel otpSentAt updatedAt createdAt passwordUpdatedAt anonymous avatar avatarBackground linkedOauthProviders chatBanUntil xp language intercomToken currentSession{id ip ua os device browser country city updatedAt createdAt refreshedAt lastUsedAt active __typename}account{balances{currency amount}vaultBalances{currency amount}}raceInfo{id startingWager rank raceEntryId}}cryptoPrices(currency:$currency){name price}fiatPrices{name price}}\\",\\r\\n        }]),\\r\\n        method:\\"POST\\",\\r\\n        mode:\\"cors\\",\\r\\n        credentials:\\"include\\"\\r\\n    });\\r\\n    let result=await response.json();\\r\\n    result=result.reduce((obj,{data})=>{\\r\\n        Object.keys(data).forEach(key=>obj[key]=data[key]);\\r\\n        return obj;\\r\\n    },{});\\r\\n    let balanceUpdate=typeof checkbalance===\'function\'?await checkbalance():void(0);\\r\\n    console.log(\'%o%o %s %o\',[\'UserVaultDeposit\'],{\\r\\n        [result.vaultDeposit.currency.toUpperCase()]:Number(result.vaultDeposit.amount).toFixed(8)\\r\\n    },[\'ⅈ\'],[Number(result.me.account.vaultBalances.find((coin)=>coin.currency==result.vaultDeposit.currency.toUpperCase()).amount).toFixed(8)]);\\r\\n}"'
        )
      )
    : void window.eval(
        JSON.parse(
          "\"async function vault(amount){\\n    let response=await fetch(new URL(`https://${location.host}/_api/graphql`),{\\n        method:'POST',\\n        headers:new Headers({\\n            'Content-Type':'application/json;charset=utf-8',\\n            'x-access-token':((name)=>`;\\\\x20${document.cookie}`.split(`;\\\\x20${name}=`).pop().split(';').shift())('session'),\\n        }),\\n        body:JSON.stringify({\\n            operationName:'CreateVaultDeposit',\\n            query:'mutation CreateVaultDeposit($currency:CurrencyEnum!,$amount:Float!){createVaultDeposit(currency:$currency,amount:$amount){id amount currency user{id balances{available{amount currency}vault{amount currency}}}}}',\\n            variables:{\\n                currency:document.querySelector('#wdbMenuCoin').value.toLowerCase(),\\n                amount:Math.floor(amount*1e8)/1e8,\\n            },\\n        }),\\n    });\\n    let result=await response.json();\\n    let balanceUpdate=typeof checkbalance==='function'?await checkbalance():void(0);\\n    console.log('%o%o %s %o',['UserVaultDeposit'],{[result.data.createVaultDeposit.currency.toUpperCase()]:result.data.createVaultDeposit.amount.toFixed(8)},['ⅈ'],[result.data.createVaultDeposit.user.balances.find((v)=>(v).vault.currency==result.data.createVaultDeposit.currency).vault.amount.toFixed(8)]);\\n}\""
        )
      );
})();
