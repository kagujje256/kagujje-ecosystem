# 💳 MarzPay Integration - Kagujje Inc.

## ⚠️ IP WHITELIST REQUIRED

**Server IP:** `144.21.57.186`

**Action Required:**
1. Go to MarzPay Dashboard
2. Navigate to: Dashboard > IP Whitelist
3. Add IP: `144.21.57.186`
4. Save changes

---

## 🔑 Credentials (Stored in Zo Secrets)

| Variable | Value |
|----------|-------|
| `MARZPAY_API_KEY` | marz_ZQWqDW0AyDUhMCWy |
| `MARZPAY_API_SECRET` | aU2UMh9mgb5kXcLYmXuECxBchht9cSIH |
| `MARZPAY_AUTH_HEADER` | bWFyel9aUVdxRFcwQXlEVWhNQ1d5OmFVMlVNaDltZ2I1a1hjTFltWHVFQ3hCY2hodDljU0lI |

---

## 🌐 API Endpoints

**Base URL:** `https://wallet.wearemarz.com/api/v1`

### Zo Space Integration

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/marzpay/balance` | GET | Check account balance |
| `/api/marzpay/collect` | POST | Collect payment from customer |
| `/api/marzpay/send` | POST | Send money to customer |
| `/api/marzpay/payment-link` | POST | Create payment link |
| `/api/marzpay/transactions` | GET | View transactions |
| `/api/marzpay/webhook` | POST | Receive payment notifications |

---

## 📱 Usage Examples

### 1. Collect Mobile Money Payment

```bash
curl -X POST https://daily4.zo.space/api/marzpay/collect \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "+256700000000",
    "amount": 5000,
    "country": "UG",
    "reference": "order-123",
    "description": "Movie subscription",
    "callback_url": "https://daily4.zo.space/api/marzpay/webhook"
  }'
```

### 2. Create Payment Link

```bash
curl -X POST https://daily4.zo.space/api/marzpay/payment-link \
  -H "Content-Type: application/json" \
  -d '{
    "title": "UGMovies Premium",
    "type": "payment",
    "amount": 10000,
    "is_fixed": true,
    "currency": "UGX",
    "description": "1 month premium subscription",
    "country": "UG",
    "collection_methods": ["mobile_money", "card"]
  }'
```

### 3. Check Balance

```bash
curl https://daily4.zo.space/api/marzpay/balance
```

---

## 🎬 UGMovies Integration

### Subscription Plans

| Plan | Price (UGX) | Features |
|-------|-------------|----------|
| Basic | 5,000 | SD streaming, ads |
| Premium | 10,000 | HD streaming, no ads |
| VIP | 25,000 | 4K, downloads, exclusive |

### Payment Flow

```
User selects plan
    ↓
Create payment link
    ↓
User pays via MTN/Airtel
    ↓
Webhook received
    ↓
Activate subscription
    ↓
User gets access
```

---

## 🔗 Webhook Events

| Event | Description |
|-------|-------------|
| `collection.success` | Payment collected successfully |
| `collection.failed` | Payment collection failed |
| `collection.pending` | Payment pending confirmation |
| `disbursement.success` | Money sent successfully |
| `disbursement.failed` | Money send failed |

---

## 🔒 Security Notes

1. **NEVER** commit API keys to GitHub
2. **ALWAYS** use Zo Secrets for credentials
3. **VERIFY** webhook signatures (when available)
4. **LOG** all transactions for audit

---

## 📞 Support

- MarzPay Dashboard: https://wallet.wearemarz.com
- Documentation: https://wallet.wearemarz.com/documentation
- Email: support@wearemarz.com

---

*Created: 2026-05-03*
*Account: Kagujje Inc.*
*Status: Pending IP Whitelist*