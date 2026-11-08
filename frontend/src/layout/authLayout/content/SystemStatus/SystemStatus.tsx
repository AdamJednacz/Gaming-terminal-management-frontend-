import { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import {
  HEARTBEAT_INTERVAL_SEC,
  WINDOW_END,
  WINDOW_MINUTES,
  services,
} from './systemStatus.mock';
import styles from './SystemStatus.module.scss';

const formatTime = (date: Date) =>
  date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

const minuteAt = (index: number) =>
  new Date(WINDOW_END.getTime() - (WINDOW_MINUTES - 1 - index) * 60_000);

const rows = services.map((service) => {
  const okMinutes = service.minutes.filter((minute) => minute === 'ok').length;

  return {
    ...service,
    okMinutes,
    uptime: `${((okMinutes / WINDOW_MINUTES) * 100).toFixed(1)}%`,
  };
});

const getSummary = () => {
  const affected = rows.find((row) => row.okMinutes < WINDOW_MINUTES);

  if (!affected) {
    return 'All services are running normally.';
  }

  const from = formatTime(minuteAt(affected.minutes.indexOf('degraded')));
  const to = formatTime(minuteAt(affected.minutes.lastIndexOf('degraded')));
  const lostMinutes = WINDOW_MINUTES - affected.okMinutes;

  return `All services are running. ${affected.name} was delayed for ${lostMinutes} min, ${from}–${to}.`;
};

const summary = getSummary();

const SystemStatus = () => {
  const [sinceBeat, setSinceBeat] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSinceBeat((prev) => (prev + 1) % HEARTBEAT_INTERVAL_SEC);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.card} aria-labelledby="system-status-title">
      <header className={styles.header}>
        <h2 id="system-status-title" className={styles.title}>
          System status
        </h2>
        <span className={styles.meta}>
          last <span className={styles.num}>{WINDOW_MINUTES}</span> min · per
          minute
        </span>
      </header>

      <p className={styles.summary}>{summary}</p>

      <div className={styles.table}>
        <div className={`${styles.row} ${styles.head}`}>
          <span>Service</span>
          <span>Availability by minute</span>
          <span className={styles.right}>Uptime</span>
        </div>

        {rows.map((row) => (
          <div key={row.id} className={styles.row}>
            <div className={styles.service}>
              <span className={styles.serviceName}>{row.name}</span>
              <span className={styles.serviceTech}>{row.tech}</span>
            </div>

            <div
              className={styles.strip}
              role="img"
              aria-label={`${row.name}: ${row.okMinutes} of ${WINDOW_MINUTES} minutes without issues`}
            >
              {row.minutes.map((minute, index) => (
                <Tooltip
                  key={index}
                  title={`${formatTime(minuteAt(index))} · ${minute === 'ok' ? 'no issues' : 'delayed'}`}
                  mouseEnterDelay={0.15}
                >
                  <span
                    className={[
                      styles.cell,
                      minute === 'degraded' && styles.degraded,
                      index === WINDOW_MINUTES - 1 &&
                        minute === 'ok' &&
                        styles.now,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                </Tooltip>
              ))}
            </div>

            <span className={`${styles.num} ${styles.right} ${styles.uptime}`}>
              {row.uptime}
            </span>
          </div>
        ))}

        <div className={`${styles.row} ${styles.axis}`}>
          <span />
          <span className={styles.axisLabels}>
            <span className={styles.num}>{formatTime(minuteAt(0))}</span>
            <span className={styles.legend}>
              <span className={styles.legendSwatch} />
              delayed
            </span>
            <span className={styles.num}>{formatTime(WINDOW_END)}</span>
          </span>
          <span />
        </div>
      </div>

      <footer className={styles.footer}>
        <span>
          Last heartbeat{' '}
          <span className={`${styles.num} ${styles.strong}`}>
            {sinceBeat} s
          </span>{' '}
          ago
        </span>
        <span>Terminal data is available after you sign in.</span>
      </footer>
    </section>
  );
};

export default SystemStatus;

