# Perseverance-Proposal
A proposal by Young Engineers Canberra to collaborate with Canberra Deep Space Communication Complex (CDSCC) to make a model of the Perseverance Mars rover. The ultimate goal of this collaboration is education outreach.

thereum JSON-RPC multi-transport client.
Rust implementation of Web3.js library.

[![Build Status][travis-image]][travis-url]

[travis-image]: https://travis-ci.org/tomusdrw/rust-web3.svg?branch=master
[travis-url]: https://travis-ci.org/tomusdrw/rust-web3

[Documentation](http://tomusdrw.github.io/rust-web3/index.html)

## Usage

First, add this to your `Cargo.toml`:

```toml
[dependencies]
web3 = { git = "https://github.com/tomusdrw/rust-web3" }
```

## Example
```rust
#[tokio::main]
async fn main() -> web3::Result<()> {
    let transport = web3::transports::Http::new("http://localhost:8545")?;
    let web3 = web3::Web3::new(transport);

    println!("Calling accounts.");
    let mut accounts = web3.eth().accounts().await?;
    println!("Accounts: {:?}", accounts);
    accounts.push("00a329c0648769a73afac7f9381e08fb43dbea72".parse().unwrap());

    println!("Calling balance.");
    for account in accounts {
        let balance = web3.eth().balance(account, None).await?;
        println!("Balance of {:?}: {}", account, balance);
    }

    Ok(())
}
```

If you want to deploy smart contracts you have written you can do something like this (make sure you have the solidity compiler installed):

`solc -o build --bin --abi contracts/*.sol`

The solidity compiler is generating the binary and abi code for the smart contracts in a directory called contracts and is being output to a directory called build.

For more see [examples folder](./examples).

## Futures
- [ ] Get rid of parking_lot (replace with async-aware locks if really needed).
- [ ] Consider getting rid of `Unpin` requirements. (#361)
- [x] WebSockets: TLS support (#360)
- [ ] WebSockets: Reconnecting & Pings
- [ ] Consider using `tokio` instead of `async-std` for `ws.rs` transport (issue with test).
- [ ] Restore IPC Transport

```rust
let web3 = Web3::new(transport);
web3.api::<CustomNamespace>().custom_method().wait().unwrap()
```

# Installation on Windows

Currently, there is an executable made in Tauri (a JavaScript framework).
```
web3 = { version = "0.11.0", default-features = false, features = ["http"] }
```
