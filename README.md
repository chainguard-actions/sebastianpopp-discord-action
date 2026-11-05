# discord-action

Send a message to a [Discord](https://discord.com/) webhook. Follow [this guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to create a webhook if you don't have one already.

## Example usage

```
name: Deploy
on: push
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
    - name: discord
      uses: sebastianpopp/discord-action@v3
      with:
        webhook: ${{ secrets.DISCORD_WEBHOOK }}
        message: ${{ github.repository }} has been successfullly deployed.
```

## Input parameters

Input parameter | Description | Required | Default
--- | --- | --- | ---
webhook | Discord webhook URL. Follow [this guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to create a webhook if you don't have one already. Do not add `/github` or any other suffix. | Yes | N/A
message | Message to be sent | Yes | N/A

## Privacy

This Action contacts Chainguard's licensing server to verify authorization. Connection metadata (IP address, GitHub repository identifier, timestamp, and any metadata encoded in the auth token) is transmitted to Chainguard, Inc. even if authorization is denied in accordance with our [Privacy Notice](https://www.chainguard.dev/legal/privacy-notice)
