const cert = `-----BEGIN CERTIFICATE-----
MIIDazCCAlOgAwIBAgIUF8tP4yWAQG7snBUeIYoCOmFOfOwwDQYJKoZIhvcNAQEL
BQAwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoM
GEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDAeFw0yMzA1MjcyMDQ5NDlaFw0yMzA2
MjYyMDQ5NDlaMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEw
HwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQCXkOmGLY4W9QNU2vH5a6zHPVq6J19LS/akNJzAeCnz
PpgTpEUQ40sv72MfYgxQGucgN44Sk0ZrSkmyhCnwcNFnE6YkS0Ctaa0YN/koJfsN
yAXPJFQgZep0XgsioHBGEcHdTEFkSf2tTkw1YWVVghwjZ0Yycu8sAax6PwoGRoYF
tlKOfRCFuWXRdfYTo8aNpGc38Eoqa/yQFdT5CY4U2qxgjZpXjwfENz/Ny9MSWbPF
vVfa1JkScZyNWyb0U+vSRFMmPaueC5/rvXGZXmgxBoUUa4RmeyhHOA/Xe8pWxfE3
qQMeHWR2Eq1/pG8vyv+UzrokcqevNPV7WBXVd7zorZ2nAgMBAAGjUzBRMB0GA1Ud
DgQWBBSUCxqM/xY5ssvLBiFz4c257Yj7ITAfBgNVHSMEGDAWgBSUCxqM/xY5ssvL
BiFz4c257Yj7ITAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQB1
dJjOjFHIiW1XGavtpnL4z+BF5VEX3AyadYEOnxuABJR42MAMPbMs3k5DbfI42p3A
iRe1mROpeUF4w286H9MlDZaEEJYxqBfiN8odIv8f/gd98gUhRZBYKMyLx2nv2MfD
q5lVuF7Ee777HnyEIDdKBOntxibvgT/2EfAO6xyoAJqHWJyqbrNaan8ulW4uTX8h
O5sjkCzCWXOGbnpuqHj797CNV282Azt44cc5Z0Nds9uma/BQRqrEsXWCj1tZfwDM
CwqieGx/Z+cDbVKoSdqWl+mhdMEB3OelcEdTfD7ZHx4wonfyylOrfemDg8yh1eNf
PgoPnRaX/li2uFOOZFpb
-----END CERTIFICATE-----
`
const key = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXkOmGLY4W9QNU
2vH5a6zHPVq6J19LS/akNJzAeCnzPpgTpEUQ40sv72MfYgxQGucgN44Sk0ZrSkmy
hCnwcNFnE6YkS0Ctaa0YN/koJfsNyAXPJFQgZep0XgsioHBGEcHdTEFkSf2tTkw1
YWVVghwjZ0Yycu8sAax6PwoGRoYFtlKOfRCFuWXRdfYTo8aNpGc38Eoqa/yQFdT5
CY4U2qxgjZpXjwfENz/Ny9MSWbPFvVfa1JkScZyNWyb0U+vSRFMmPaueC5/rvXGZ
XmgxBoUUa4RmeyhHOA/Xe8pWxfE3qQMeHWR2Eq1/pG8vyv+UzrokcqevNPV7WBXV
d7zorZ2nAgMBAAECggEADhn/+Clt4mnqZO83+zZO7XyiX9aA8b8AFBgHC4tCj+yf
dpheiqszGCMkLEvRjHRsU52HnOfR8fKH99F/G21LtlToLNFJk7jUz3+JsXgTKx2U
mMivARKqZShIzfBycbp+OIo7PUr7DLBPu9mzdWi1GIAn0lLKOORw+TC7TIksOASx
YeBnq6V/ZZdqTMph68zfALOGVA/DuwOhD5x3NMz5LdCBdxL5uyAnN01niL7E/dye
TvpS91oGut5xWthENx9gpkzqoLF/iB4vevrbSuX8yQWl7n30HWhxVkgL9AhV/Eo/
CkyjKobG+vBJNoDE1WtI9r62yaRmViQUoTIsrKAUCQKBgQC5XRiu8oDEs1iy7V0a
Q0QnRf0SAZwtttkYr6SQqvi5eW1F8yBtOky+DvLwJaVpLnIwAtwv9GmlkblPPnhr
8Lubzi9xdq9caWSowMKd11cTGPaF7JUQD0Q9HAQx8Un1Z+6tiFhxdnlJ8X3IWYVa
Pgl8SyGWX6URu4fb8MRwMdjC6QKBgQDRUryWpCelFNf4uTbAhPP1kRHjQ2eso/xk
Jrw4XpotZWL9OrO33FC5e09qUW7hlRsTikXKTcnoi3FMmpq8bVv4aY9v7mHb8yD7
rqxHY+WTkcOXQGftS5lGAxjz2yztHJIUEQHT/G6Fw3XD1gq6QqJLYzpfqOWkyruZ
thBdE1ViDwKBgEO77SUgoEVAdA0OB5NtOR5QyOUniXZ69mG67RugHjtIT9HbweGo
CBr7Q3LVjtgcjMVWhjdPzLsfwONgJIjs8uFAOr3vbK0MJig0J+mdosfru0m85ct0
iK776dyGG0x9qg3nYMo1TKTkhd4MOFp9iOHOYnucf6k3KbIJDP8id97hAoGAU6TI
DzoRTXoCwzTfmBaIlbwedb3dk7MDi9GerLfAzBsTbzUh03qKF1Qa69UWhbXbV/eM
48YpxG7UG1Q8OMdKVP15f7S2DfodV/T4ip50gn9gtPPbk4r9+GgMdIVEcotUJAiX
vmnEkFcGm/bP2pX93DoOfWM0QKFyTX3fFBJBsCkCgYBkB6XTJBQwNPmZO5pMdv1k
xzFf+JH6SetR5uY3e0B5BIMZS6V3PDOHejQ5Nt5rKeHw2YsRQ4+mmZZeIblHA6JB
lBJHLv9eizrR/CG/TRCwPCNzXhpqBm5AhLduhrjkoB2eNyLzb7hcEWGL01OKP8+h
v1ruIXsnBgWDNZb65KUVCg==
-----END PRIVATE KEY-----
`

module.exports = {key, cert}