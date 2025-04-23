"""
Модуль views для приложения поддерживающего аутентификацию пользователей
"""
from django.shortcuts import render, redirect
from django.urls.base import reverse_lazy
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.views import LogoutView
from django.views.generic import DetailView
from django.views.generic.edit import FormView
from django.views.generic.base import TemplateView
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from authorization.forms import RegisterForm
from authorization.services import ActionAfterCreatingUsers, AuthorizationContext


class CustomLogoutView(LogoutView):
    def dispatch(self, request, *args, **kwargs):
        logout(request)
        return redirect("/")


class ProfileView(LoginRequiredMixin, DetailView):
    """
    Класс представления для просмотра профиля пользователя.
    Использует миксин LoginRequiredMixin для ограничения доступа к профилю только зарегистрированным пользователям.
    """
    model = User  # Пользовательская модель, необходимая для выборки записей
    template_name = 'authorization/profile.html'  # Имя шаблона для рендеринга страницы профиля
    context_object_name = 'user_profile'  # Название ключа в контексте, под которым передается пользователь в шаблон

    def get_object(self, queryset=None):
        """
        Возвращает текущий залогиненный объект пользователя.
        """
        return self.request.user  # Получение текущего пользователя из запроса

    def dispatch(self, request, *args, **kwargs):
        """
        Выполняется перед основной обработкой запроса.
        Проверяет, залогинен ли пользователь. Если нет, перенаправляет на страницу входа.
        """
        if not request.user.is_authenticated:  # Проверка, залогинен ли пользователь
            return redirect(reverse_lazy('login'))  # Редирект на страницу входа
        return super().dispatch(request, *args, **kwargs)  # Переход к обычной обработке запроса


class IndexPage(TemplateView):
    """
    Простое представление для домашней страницы (индекса).
    Рендерит статический шаблон index.html с дополнительным контекстом.
    """
    template_name = 'index.html'  # Файл шаблона для рендеринга

    def get_context_data(self, **kwargs):
        """
        Добавляем дополнительные данные в контекст перед рендерингом шаблона.
        """
        context = super().get_context_data(**kwargs)  # Получаем стандартные данные контекста
        context.update(AuthorizationContext.get_context_for_index_page())  # Дополняем контекст данными из сервиса авторизации
        return context  # Возвращаем обновленный контекст


class RegisterView(FormView):
    """
    Класс представления для регистрации новых пользователей.
    """
    form_class = RegisterForm  # Форма регистрации
    template_name = 'registration/registration.html'  # Шаблон для отображения формы регистрации
    success_url = reverse_lazy('authorization:profile')  # Куда перенаправлять после успешной регистрации

    def form_valid(self, form):
        """
        Обрабатываем успешную регистрацию пользователя.
        :param form: Валидная форма регистрации
        :return: Результат выполнения родительской функции form_valid
        """
        # Создание нового пользователя на основании валидной формы
        user = form.save()
        
        # После регистрации создаем начальные настройки и структуры для пользователя
        ActionAfterCreatingUsers.create_default_sections(user)
        
        # Автоматически авторизуем нового пользователя сразу после регистрации
        login(self.request, user)
        
        return super().form_valid(form)  # Завершаем обработку родителя и выполняем перенаправление