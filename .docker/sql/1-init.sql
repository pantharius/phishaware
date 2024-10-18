-- Créer un utilisateur avec un mot de passe
CREATE USER phishAwAreU5ld1m09
WITH
    ENCRYPTED PASSWORD 'g4i9n12A3c#lTù+1f';

-- Accorder tous les privilèges sur la base de données actuelle à l'utilisateur
GRANT ALL PRIVILEGES ON DATABASE phish_aware TO phishAwAreU5ld1m09;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";