FROM onfinality/subql-node:latest

COPY . /app

ENTRYPOINT ["/sbin/tini", "--", "/usr/local/lib/node_modules/@subql/node/bin/run"]

CMD ["-f", "/app"]
