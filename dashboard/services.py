from django.utils import timezone
from django.contrib.auth import get_user_model
from attendance.models import Attendance

User = get_user_model()


def get_user_stats():
    return {
        "total_users": User.objects.count(),
        "admins": User.objects.filter(role="ADMIN").count(),
        "distributors": User.objects.filter(role="DISTRIBUTOR").count(),
    }


def get_today_attendance_stats():
    today = timezone.now().date()

    total_marked = Attendance.objects.filter(date=today).count()
    present = Attendance.objects.filter(date=today, status="PRESENT").count()
    absent = Attendance.objects.filter(date=today, status="ABSENT").count()

    return {
        "date": today,
        "total_marked": total_marked,
        "present": present,
        "absent": absent,
    }


def get_user_wise_attendance():
    data = []

    users = User.objects.all()

    for user in users:
        total = Attendance.objects.filter(user=user).count()
        present = Attendance.objects.filter(user=user, status="PRESENT").count()

        data.append({
            "user_id": user.id,
            "username": user.username,
            "role": user.role,
            "total_days": total,
            "present_days": present,
        })

    return data
