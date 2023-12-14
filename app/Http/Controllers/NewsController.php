<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $newsLists = new NewsCollection(News::OrderByDesc('created_at')->paginate(8));
        return Inertia::render('Home', [
            'title' => 'Home',
            'newsLists' => $newsLists
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
        $news->save();
        return Redirect::back()->with('message', 'News successfully created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $myNewsLists = $news::where('author', auth()->user()->email)->OrderByDesc('updated_at')->get();
        return Inertia::render('Dashboard', [
            'myNewsLists' => $myNewsLists
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, News $news)
    {
        return Inertia::render('EditNews', [
            'myNews' => $news->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        News::find($request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);
        return Redirect::to('dashboard')->with('message', 'News successfully updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, News $news)
    {
        News::find($request->id)->delete();
        return Redirect::back()->with('message', 'News successfully deleted!');
    }
}
