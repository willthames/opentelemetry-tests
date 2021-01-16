const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/tracing');

const provider = new NodeTracerProvider({
  plugins: {
    koa: {
      enabled: true,
      // You may use a package name or absolute path to the file.
      path: '@opentelemetry/koa-instrumentation',
    }
  }
});

provider.register();

provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new ConsoleSpanExporter({
      serviceName: "sls-test",
    })
  )
);
