package com.example.alligatorstours.chatbot.ui

import android.app.Activity
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.StrictMode
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.text.Html
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.alligatorstours.BuildConfig
import com.example.alligatorstours.R
import com.example.alligatorstours.chatbot.cca2client.CCA2Client
import com.example.alligatorstours.chatbot.data.Message
import com.example.alligatorstours.chatbot.utils.Constants.RECEIVE_ID
import com.example.alligatorstours.chatbot.utils.Constants.SEND_ID
import com.example.alligatorstours.chatbot.utils.Time
import kotlinx.android.synthetic.main.activity_chat.*
import kotlinx.coroutines.*
import java.util.*


class ChatActivity : AppCompatActivity() {
    var cca2ContextPath = BuildConfig.CCA_CONTEXT_PATH
    var cca2Auth = BuildConfig.CCA_AUTH
    var cogbotId = BuildConfig.COGBOT_ID
    var language = "en-us"
    var country = "us"

    private lateinit var adapter: MessagingAdapter

    @RequiresApi(Build.VERSION_CODES.N)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat)

        recyclerView()

        clickEvents()
        customMessage("Hello! Today you're speaking with Alli. How may I help?")
    }

    private fun clickEvents() {

        val progressBar = findViewById<ProgressBar>(R.id.progBar)

        btn_send.setOnClickListener {

            GlobalScope.launch {
                delay(200)
                sendMessage()
//            progressBar.visibility = ProgressBar.INVISIBLE
            }
            progressBar.visibility = ProgressBar.VISIBLE
        }

        et_message.setOnClickListener {
            GlobalScope.launch {
                delay(100)
                withContext(Dispatchers.Main) {
                    rv_messages.scrollToPosition(adapter.itemCount - 1)
                }
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.N)
    private fun callClient(input: String) {
        val progressBar = findViewById<ProgressBar>(R.id.progBar)

        val timeStamp = Time.timeStamp()

        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        val cca2Client =
            CCA2Client(
                cca2ContextPath,
                cca2Auth,
                cogbotId,
                language,
                country
            )

        val messageResponse: List<List<String>> = cca2Client.callMessageApi(input)
        //view.text = ""
        var response = ""
        for (list in messageResponse) {
            for (item in list) {
                println(item)
                //view.append(Html.fromHtml(item, 0, null, null))
                response += Html.fromHtml(item, 0, null, null).toString()
            }
        }

        GlobalScope.launch {
            delay(1000)
            withContext(Dispatchers.Main) {
                adapter.insertMessage(Message(response, RECEIVE_ID, timeStamp))
                rv_messages.scrollToPosition(adapter.itemCount - 1)
            }
            progressBar.visibility = ProgressBar.INVISIBLE
        }
    }

    override fun onStart() { // keep at bottom of screen
        super.onStart()

        GlobalScope.launch {
            delay(1000)
            withContext(Dispatchers.Main) {
                rv_messages.scrollToPosition(adapter.itemCount - 1)
            }
        }
    }

    private fun recyclerView() {
        adapter = MessagingAdapter()
        rv_messages.adapter = adapter
        rv_messages.layoutManager = LinearLayoutManager(applicationContext)
    }

    private fun sendMessage() {
        val message = et_message.text.toString()
        val timeStamp = Time.timeStamp()

        if (message.isNotEmpty()) {
            et_message.setText("")

            this@ChatActivity.runOnUiThread(java.lang.Runnable {
                adapter.insertMessage(Message(message, SEND_ID, timeStamp))
                rv_messages.scrollToPosition(adapter.itemCount - 1)
            })

            callClient(message)
        }
    }

    private fun customMessage(message: String) {
        GlobalScope.launch {
            delay(1000)
            withContext(Dispatchers.Main) {
                val timeStamp = Time.timeStamp()
                adapter.insertMessage(Message(message, RECEIVE_ID, timeStamp))

                rv_messages.scrollToPosition(adapter.itemCount - 1)
            }
        }
    }
}