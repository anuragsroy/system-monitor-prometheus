from flask import Flask, jsonify, Response
import psutil
from prometheus_client import Gauge, Counter, generate_latest, CONTENT_TYPE_LATEST
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Prometheus metrics
CPU_USAGE = Gauge(
    "system_cpu_usage_percent",
    "System CPU usage percentage"
)

MEMORY_USAGE = Gauge(
    "system_memory_usage_percent",
    "System memory usage percentage"
)

REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total HTTP requests"
)

@app.route("/api/system")
def system_metrics():
    REQUEST_COUNT.inc()

    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory().percent

    CPU_USAGE.set(cpu)
    MEMORY_USAGE.set(memory)

    return jsonify({
        "cpu": cpu,
        "memory": memory
    })

@app.route("/metrics")
def metrics():
    return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
