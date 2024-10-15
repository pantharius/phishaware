psql -d postgres -a -f /sql/0-setup.sql
psql -d phish_aware -a -f /sql/1-init.sql