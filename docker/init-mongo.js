print("Début du script d'initialisation MongoDB");

db = db.getSiblingDB('parkawouf');
print("Base de données sélectionnée: " + db.getName());

db.createUser({
  user: 'parkawouf-user',
  pwd: 'parkawouf-password',
  roles: [
    {
      role: 'readWrite',
      db: 'parkawouf',
    },
  ],
});

print("Utilisateur créé pour la base de données parkawouf");
