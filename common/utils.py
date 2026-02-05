def get_message(key, lang='en'):
    messages = {
        'login_success': {
            'en': 'Login successful',
            'hi': 'लॉगिन सफल रहा'
        }
    }
    return messages.get(key, {}).get(lang, '')
