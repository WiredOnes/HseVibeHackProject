
<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Мои проекты</h1>
    </header>

    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка репозиториев...</p>
    </div>

    <!-- Ошибка или отсутствие токена -->
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="retryFetch" class="btn-retry">Попробовать снова</button>
    </div>

    <!-- Список репозиториев -->
    <ul v-else class="repo-list">
      <li 
        v-for="repo in repositories" 
        :key="repo.id" 
        class="repo-card"
        @click="navigateToRepo(repo)"
      >
        <div class="repo-main-info">
          <h2 class="repo-name">{{ repo.name }}</h2>
          
          <!-- Бейдж приватности согласно полю 'private' из схемы Repository -->
          <span :class="['privacy-badge', repo.private ? 'badge-private' : 'badge-public']">
            {{ repo.private ? 'private' : 'public' }}
          </span>
        </div>

        <div class="repo-meta">
          <span class="updated-date">
            Обновлено {{ formatDate(repo.updated_at) }}
          </span>
        </div>

        <div class="arrow-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </li>
      
      <li v-if="repositories.length === 0" class="empty-state">
        Репозитории не найдены.
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      repositories: [],
      isLoading: false,
      error: null
    };
  },
  async mounted() {
    await this.fetchRepositories();
  },
  methods: {
    /**
     * Получает список репозиториев согласно operationId: GetRepositories
     */
    async fetchRepositories() {
      const token = localStorage.getItem('github_access_token');

      if (!token) {
        this.error = 'Токен доступа не найден. Пожалуйста, войдите в систему.';
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        // Формирование запроса согласно securityScheme: bearerAuth
        const response = await fetch(`https://jiodsmgksd.duckdns.org/repositories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || 'Ошибка при получении данных');
        }

        const data = await response.json();
        
        // Схема отвечает массивом Repository объектов
        this.repositories = Array.isArray(data) ? data : [];

      } catch (err) {
        console.error(err);
        this.error = err.message || 'Не удалось загрузить данные';
      } finally {
        this.isLoading = false;
      }
    },
    
    retryFetch() {
      this.fetchRepositories();
    },

    // Форматирование даты ISO String -> DD.MM.YY
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });
    },

    navigateToRepo(repo) {
      // Переход к конкретному репозиторию (пример с Vue Router)
      // Это соответствует логике кнопки со стрелкой
      this.$router.push(`/repository/${repo.id}`);
    }
  }
};
</script>

<style scoped>
/* Основной фон - темно-синий, почти черный, как на скриншоте */
.dashboard-container {
  background-color: #0f172a; /* Slate 900 */
  min-height: 100vh;
  color: #ffffff;
  padding: 2rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.dashboard-header h1 {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.repo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px; /* Отступ между карточками */
}

.repo-card {
  background-color: #1e293b; /* Slate 800 */
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.repo-card:hover {
  background-color: #334155; /* Slate 700 hover */
}

.repo-main-info {
  display: flex;
  flex-direction: column;
}

.repo-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #e2e8f0;
}

.privacy-badge {
  display: inline-block;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
  margin-top: 4px;
  margin-left: 8px;
  text-transform: uppercase;
}

.badge-private {
  background-color: #334155;
  color: #94a3b8;
}

.badge-public {
  background-color: #334155;
  color: #94a3b8;
  /* Можно сделать зеленый оттенок для public если нужно, 
     но на скриншоте они выглядят одинаковыми серыми блоками */
}

.repo-meta {
  margin-top: auto; /* Прижимаем к низу контейнера текста */
}

.updated-date {
  font-size: 0.85rem;
  color: #64748b;
}

.arrow-icon {
  color: #64748b;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon svg {
  stroke: currentColor;
}

/* Утилиты для состояний загрузки/ошибки */
.loading-container, .error-container {
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #334155;
  border-top: 4px solid #64748b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.btn-retry {
  margin-top: 1rem;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>