# Skilaverkefni 3 – Backend API

Þetta verkefni er TypeScript/Express bakendi sem tengist PostgreSQL gagnagrunni. Verkefnið inniheldur CRUD virkni, gagnagrunnstengingar, controllers og routing.

---

## 📦 Uppsetning

### 1. Klóna verkefnið

```bash
git clone https://github.com/hardardottir93/skilaverkefni-3.git
cd skilaverkefni-3
```

### 2. Setja upp dependencies

```bash
npm install
```

---

## 🗄 Database Setup (PostgreSQL)

Til að keyra verkefnið þarftu virkan PostgreSQL gagnagrunn.

### 1. Búa til gagnagrunn

Keyrðu í terminal eða pgAdmin:

```sql
CREATE DATABASE recipe_homework;
```

### 2. Setja upp `.env` skrá

Búðu til `.env` í rót verkefnis:

> Skiptu út `USER` og `PASS` fyrir þinn gagnagrunnsnotanda.

### 3. Setja upp gagnagrunn 

Notaðu `schema.sql` sem skilgreinir töflur.
Gert t.d. í pgAdmin:

* Opna **Query Tool**
* Open File → Velja skrá
* Keyra

---

## ▶️ Keyra verkefnið 🔧

```bash
npm run dev
```

Ef allt er uppsett rétt sérðu eitthvað á þessa leið:

```
Server running on http://localhost:3000
Connected to PostgreSQL database
```

Ef villur koma í ljós gæti verið að:

* `.env` sé ekki rétt stillt
* gagnagrunnurinn sé ekki keyrandi
* `schema.sql` hafi ekki verið keyrt

---

## 📝 Athugasemdir

Notast var við Postman til að sannreyna verkefni.  
Search virkar bara á recipes vegna misskilnings þegar verkefni var gert.  
EXPECTED_RESPONSES.md biður um `GET /api/recipes?q=pasta`. Það virkar fyrir það. 

---

## ✔️ Lokið
