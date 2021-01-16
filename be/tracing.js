const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { HoneycombExporter } = require('opentelemetry-exporter-honeycomb');
const api = require('@opentelemetry/api');
const { B3Propagator } = require('@opentelemetry/propagator-b3');

api.propagation.setGlobalPropagator(new B3Propagator());
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
    new HoneycombExporter({
      serviceName: "backend",
      writeKey: process.env.WRITE_KEY,
      dataset: "opentelemetry-tests"
    })
  )
);
